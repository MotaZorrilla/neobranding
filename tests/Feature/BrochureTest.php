<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Lead;
use App\Models\AnalyticsEvent;
use Illuminate\Support\Facades\Storage;

class BrochureTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_generate_and_record_brochure_download()
    {
        Storage::fake('public');

        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'industry' => 'Tecnología'
        ];

        $response = $this->post(route('brochure.download'), $data);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        // Verificar que se creó el Lead
        $this->assertDatabaseHas('leads', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'service' => 'Brochure 2026'
        ]);

        // Verificar Telemetría
        $this->assertDatabaseHas('analytics_events', [
            'type' => 'conversion',
            'category' => 'brochure'
        ]);

        // Verificar que el archivo existe en storage
        $url = $response->json('download_url');
        $filename = basename($url);
        Storage::disk('public')->assertExists('brochures/' . $filename);
    }
}
