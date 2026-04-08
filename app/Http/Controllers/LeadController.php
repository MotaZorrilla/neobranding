<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\AnalyticsEvent;
use App\Mail\NewLeadNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    /**
     * Guardar un nuevo lead desde el frontend.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'service' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'country' => 'nullable|string|max:100',
        ]);

        try {
            $lead = Lead::create($validated);

            // TELEMETRÍA: Registro de conversión real
            AnalyticsEvent::log('conversion', 'form_contacto', $validated['service'] ?? 'general');

            // Enviar Notificación por Correo
            $adminEmail = env('MAIL_FROM_ADDRESS', 'admin@neobranding.cl');
            Mail::to($adminEmail)->send(new NewLeadNotification($lead));

            Log::info("Nuevo Lead capturado y notificado: " . $lead->email);

            return redirect()->back();

        } catch (\Exception $e) {
            Log::error("Error al guardar/notificar lead: " . $e->getMessage());
            return redirect()->back()->withErrors(['message' => 'Hubo un problema al procesar tu solicitud.']);
        }
    }

    /**
     * Listar leads para el panel administrativo.
     */
    public function index()
    {
        return \Inertia\Inertia::render('Admin/Leads', [
            'leads' => Lead::latest()->get()
        ]);
    }
}
