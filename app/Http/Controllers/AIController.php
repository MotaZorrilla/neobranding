<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

use App\Models\AiConversation;
use App\Models\AiMessage;

use Inertia\Inertia;

class AIController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/AiConversations', [
            'conversations' => AiConversation::with(['messages', 'lead'])
                ->latest()
                ->paginate(15)
        ]);
    }

    public function chat(Request $request)
    {
        $request->validate(['message' => 'required|string']);

        $userMessage = $request->input('message');
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json(['reply' => 'API Key no configurada.']);
        }

        // 1. Identificar o Crear Conversación (basado en sesión)
        $sessionId = session()->getId();
        $conversation = AiConversation::firstOrCreate(
            ['session_id' => $sessionId],
            ['status' => 'active', 'metadata' => ['ip' => $request->ip(), 'agent' => $request->userAgent()]]
        );

        // 2. Guardar Mensaje del Usuario
        AiMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'user',
            'content' => $userMessage
        ]);

        // TELEMETRÍA: Registrar interés si es el primer mensaje o tiene datos de contacto
        if ($conversation->messages()->count() === 1) {
            AnalyticsEvent::log('click', 'neo', 'inicio_chat');
        }
        
        if (preg_match('/[0-9]{7,}/', $userMessage) || str_contains($userMessage, '@')) {
            AnalyticsEvent::log('conversion', 'neo', 'datos_contacto');
            $conversation->update(['status' => 'converted']);
        }

        // Configuración de Neo: Consultor de Estrategia Digital Senior
        $systemInstruction = "Eres Neo, Consultor de Estrategia Digital Senior en Neobranding. Tu objetivo NO es solo informar, sino CALIFICAR leads y CERRAR una 'Visita Virtual de 15 min'.

ESTILO COMERCIAL (METODOLOGÍA AIDA):
1. ATENCIÓN: Saluda con autoridad y elegancia. No eres un bot, eres un aliado estratégico.
2. INTERÉS: Si preguntan por servicios, responde brevemente y lanza una pregunta de calificación: '¿Buscas lanzar un proyecto desde cero o escalar una marca ya posicionada?'.
3. DESEO: Resalta que fusionamos Ingeniería de Software (Laravel/React) con Branding Psicológico y Renders 3D fotorrealistas. Somos los únicos que humanizan la tecnología.
4. ACCIÓN (EL CIERRE): Tu meta final es agendar la 'Visita Virtual'. Si el usuario muestra interés real, di: 'Para darte una hoja de ruta exacta y presupuesto, lo ideal es una Visita Virtual de 15 min con nuestro Director. ¿Te parece bien si me dejas tu Nombre y WhatsApp para coordinar?'.

CONOCIMIENTO DE PRODUCTO:
- SERVICIOS CORE: Marca Inteligente (Psychology + Design), Presencia Digital (Webs Pro + SEO), Academy (IA aplicada), Engineering Lab (Software a medida y Renders 3D).
- PLANES WEB (PROMO): 
    * Básico ($25k/mes): Para profesionales.
    * Crece ($35k/mes): EL MÁS RECOMENDADO. Pymes, incluye backup y mayor uptime.
    * Pro ($65k/mes): E-commerce y proyectos VIP.
- TECNOLOGÍAS: Laravel, React, Tailwind 4, Gemini 2.5, Python, Renders 3D de alta gama.

REGLAS DE ORO:
- Respuestas breves (máximo 3 párrafos).
- Nunca des precios finales sin antes calificar el proyecto.
- Si el usuario deja su WhatsApp, agradécele y dile que un consultor senior lo contactará en breve.";

        try {
            // Confirmado: Usando el modelo de vanguardia gemini-2.5-flash
            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . $apiKey;

            // ESTRATEGIA DE RESILIENCIA: Reintentar 3 veces con una espera de 1 segundo entre intentos
            $response = Http::withoutVerifying()
                ->retry(3, 1000, function ($exception, $request) {
                    return $exception instanceof \Illuminate\Http\Client\ConnectionException || 
                           $exception->getCode() >= 500 || 
                           $exception->getCode() == 429;
                })
                ->post($url, [
                    'system_instruction' => [
                        'parts' => [['text' => $systemInstruction]]
                    ],
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [['text' => $userMessage]]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 1000,
                    ]
                ]);

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Interesante. ¿Podrías contarme más?';

                // 3. Guardar Respuesta de la IA
                AiMessage::create([
                    'conversation_id' => $conversation->id,
                    'role' => 'ai',
                    'content' => $reply
                ]);

                return response()->json(['reply' => $reply]);
            }

            // Manejo específico de Saturación (Rate Limit)
            if ($response->status() == 429 || $response->status() == 503) {
                return response()->json(['reply' => 'Neo está procesando muchas consultas en este momento. Por favor, espera un par de segundos y vuelve a enviarme tu mensaje.'], 200);
            }

            Log::error('Gemini Error: ' . $response->body());
            return response()->json(['reply' => 'Tuve un breve error de conexión con mi red neuronal. ¿Podrías reintentar?'], 500);

        } catch (\Exception $e) {
            Log::error('Chat Exception: ' . $e->getMessage());
            return response()->json(['reply' => 'Mi red está en mantenimiento. Reintenta en un momento.'], 500);
        }
    }
}
