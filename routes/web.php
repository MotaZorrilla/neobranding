<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LeadController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HostingPlanController;
use App\Http\Controllers\AIController;
use App\Http\Controllers\BrochureController;
use App\Models\HostingPlan;

use App\Models\AnalyticsEvent;

Route::get('/', function () {
    AnalyticsEvent::log('view', 'home');
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'hostingPlans' => HostingPlan::where('is_active', true)->orderBy('sort_order')->get(),
    ]);
});

Route::post('/leads', [LeadController::class, 'store'])->name('leads.store');
Route::post('/download-brochure', [BrochureController::class, 'download'])->name('brochure.download');

Route::get('/dashboard', function () {
    try {
        $totalViews = AnalyticsEvent::where('type', 'view')->count();
        $conversions = AnalyticsEvent::where('type', 'conversion')->count();
        $ctr = ($totalViews > 0) ? round(($conversions / $totalViews) * 100, 2) : 0;
        
        $leads = \App\Models\Lead::latest()->get();

        // Estadísticas dinámicas reales
        $conversionStats = [
            'views' => (string)$totalViews,
            'ctr' => $ctr . '%',
            'conversions_count' => (string)$conversions,
            'uptime' => '99.9%'
        ];

        return Inertia::render('Dashboard', [
            'leads' => $leads,
            'hostingPlans' => HostingPlan::orderBy('sort_order')->get(),
            'aiConversations' => \App\Models\AiConversation::with(['messages', 'lead'])->latest()->take(10)->get(),
            'conversionStats' => $conversionStats,
            'leads_count' => $leads->count() // Para la campanita del Layout
        ]);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error("Dashboard Error: " . $e->getMessage());
        return back()->withErrors(['error' => 'Error al cargar el dashboard.']);
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/admin/chats', [AIController::class, 'index'])->name('ai.index');
    Route::resource('hosting-plans', HostingPlanController::class);
    Route::get('/leads', [LeadController::class, 'index'])->name('leads.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/chat', [AIController::class, 'chat'])->name('ai.chat');

require __DIR__.'/auth.php';
