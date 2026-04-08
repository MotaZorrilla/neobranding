<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use App\Models\AnalyticsEvent;
use Illuminate\Support\Facades\Log;
use Dompdf\Dompdf;
use Dompdf\Options;

class BrochureController extends Controller
{
    public function download(Request $request)
    {
        // Forzamos el límite del VPS
        ini_set('memory_limit', '128M');
        set_time_limit(120);

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:255',
                'company' => 'required|string|max:255',
                'interests' => 'required|array',
            ]);

            $cleanName = ucwords(strtolower($validated['name']));
            $cleanCompany = strtoupper($validated['company']);

            // 1. Registrar Lead
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

            // 3. Preparar Imágenes Base64 (Ultra optimizadas para 128MB)
            $images = [
                'why' => $this->base64Optimized('images/why.png', 600),
                'skills' => $this->base64Optimized('images/skills.jpg', 500),
                'apartamento' => $this->base64Optimized('images/engineering/apartamento.png', 600),
                'posada' => $this->base64Optimized('images/engineering/posada.png', 600),
                'fachada' => $this->base64Optimized('images/engineering/Fachada.png', 600),
                // Logos de aliados muy pequeñitos para ahorrar RAM
                'partner1' => $this->base64Optimized('images/partners/nb-ingenieria.jpg', 120),
                'partner2' => $this->base64Optimized('images/partners/metros-cuadrados.jpg', 120),
                'partner3' => $this->base64Optimized('images/partners/neomarketing.jpg', 120),
                'partner4' => $this->base64Optimized('images/partners/logo-guayanahost.jpg', 400),
                'partner5' => $this->base64Optimized('images/partners/nb-coworks.jpg', 120),
                'partner6' => $this->base64Optimized('images/partners/nb-qr.jpg', 120),
                'partner7' => $this->base64Optimized('images/partners/grupo-ambiado.jpg', 120),
                'partner8' => $this->base64Optimized('images/partners/logo-mz-personal.jpg', 120),
            ];

            // 4. Renderizar HTML
            $html = view('pdf.brochure', [
                'name' => $cleanName,
                'company' => $cleanCompany,
                'interests' => $validated['interests'],
                'img' => $images,
                'email' => 'neobranding@neobranding.cl'
            ])->render();

            // 5. Configurar Dompdf
            $options = new Options();
            $options->set('isRemoteEnabled', true);
            $options->set('isHtml5ParserEnabled', true);
            $options->set('defaultFont', 'Helvetica');
            
            $dompdf = new Dompdf($options);
            $dompdf->loadHtml($html);
            $dompdf->setPaper('letter', 'portrait');
            $dompdf->render();
            
            $filename = 'Dossier_NB_' . time() . '.pdf';
            $publicPath = public_path('storage/brochures');
            
            if (!file_exists($publicPath)) {
                mkdir($publicPath, 0775, true);
            }

            file_put_contents($publicPath . '/' . $filename, $dompdf->output());

            return response()->json([
                'success' => true,
                'download_url' => asset('storage/brochures/' . $filename),
                'filename' => "Dossier_Neobranding_{$cleanCompany}.pdf"
            ]);

        } catch (\Exception $e) {
            Log::error('PDF ERROR: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Error de procesamiento. Intenta con menos áreas seleccionadas.'
            ], 500);
        }
    }

    private function base64Optimized($path, $maxWidth = 600) {
        try {
            $fullPath = public_path($path);
            if (!file_exists($fullPath)) return '';

            list($width, $height, $type) = getimagesize($fullPath);
            
            // Redimensionar para ahorrar RAM
            $ratio = $maxWidth / $width;
            $newWidth = $maxWidth;
            $newHeight = $height * $ratio;

            $src = null;
            switch ($type) {
                case IMAGETYPE_JPEG: $src = imagecreatefromjpeg($fullPath); break;
                case IMAGETYPE_PNG:  $src = imagecreatefrompng($fullPath);  break;
                case IMAGETYPE_WEBP: $src = imagecreatefromwebp($fullPath); break;
                default: return '';
            }

            $dst = imagecreatetruecolor($newWidth, $newHeight);
            imagecopyresampled($dst, $src, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

            ob_start();
            imagejpeg($dst, null, 90); // Calidad 90 para logos nítidos
            $data = ob_get_clean();

            imagedestroy($src);
            imagedestroy($dst);

            return 'data:image/jpeg;base64,' . base64_encode($data);
        } catch (\Exception $e) {
            return '';
        }
    }
}
