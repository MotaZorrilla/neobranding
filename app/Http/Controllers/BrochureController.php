<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use App\Models\AnalyticsEvent;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class BrochureController extends Controller
{
    public function download(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:255',
                'company' => 'required|string|max:255',
                'interests' => 'required|array',
            ]);

            // Normalización de nombres según instrucción del usuario
            $cleanName = ucwords(strtolower($validated['name']));
            $cleanCompany = strtoupper($validated['company']);

            // 1. Guardar Lead
            Lead::create([
                'name' => $cleanName,
                'company' => $cleanCompany,
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'service' => 'Dossier Corporativo 2026',
                'message' => "Solicitó brochure personalizado. Intereses: " . implode(', ', $validated['interests']),
            ]);

            // 2. Telemetría
            AnalyticsEvent::log('conversion', 'brochure', implode('|', $validated['interests']));

            // 3. Preparar Imágenes en Base64 (Intercambiamos partner 3 y 4)
            $images = [
                'why' => $this->base64('images/why.png'),
                'skills' => $this->base64('images/skills.jpg'),
                'apartamento' => $this->base64('images/engineering/apartamento.png'),
                'posada' => $this->base64('images/engineering/posada.png'),
                'fachada' => $this->base64('images/engineering/Fachada.png'),
                'partner1' => $this->base64('images/partners/nb-ingenieria.jpg'),
                'partner2' => $this->base64('images/partners/metros-cuadrados.jpg'),
                'partner3' => $this->base64('images/partners/neomarketing.jpg'), // Era 4, ahora es 3
                'partner4' => $this->base64('images/partners/logo-guayanahost.jpg'), // Era 3, ahora es 4
                'partner5' => $this->base64('images/partners/nb-coworks.jpg'),
                'partner6' => $this->base64('images/partners/nb-qr.jpg'),
                'partner7' => $this->base64('images/partners/grupo-ambiado.jpg'),
                'partner8' => $this->base64('images/partners/logo-mz-personal.jpg'),
            ];

            // 4. Generar PDF
            $filename = 'Dossier_Neobranding_' . str_replace(' ', '_', $cleanCompany) . '_' . time() . '.pdf';
            
            $pdf = Pdf::loadView('pdf.brochure', [
                'name' => $cleanName,
                'company' => $cleanCompany,
                'interests' => $validated['interests'],
                'img' => $images,
                'email' => 'neobranding@neobranding.cl'
            ]);
            
            $pdf->setPaper('letter', 'portrait');

            if (!Storage::disk('public')->exists('brochures')) {
                Storage::disk('public')->makeDirectory('brochures');
            }

            Storage::disk('public')->put('brochures/' . $filename, $pdf->output());

            return response()->json([
                'success' => true,
                'download_url' => asset('storage/brochures/' . $filename),
                'filename' => "Dossier_Neobranding_{$cleanCompany}.pdf"
            ]);
        } catch (\Exception $e) {
            Log::error('PDF Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function base64($path) {
        try {
            $fullPath = public_path($path);
            if (!file_exists($fullPath)) return '';
            $type = pathinfo($fullPath, PATHINFO_EXTENSION);
            $data = file_get_contents($fullPath);
            return 'data:image/' . $type . ';base64,' . base64_encode($data);
        } catch (\Exception $e) {
            return '';
        }
    }
}
