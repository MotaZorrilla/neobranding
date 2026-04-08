<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

// --- CORRECCIÓN PARA VPS / SHARED HOSTING ---
// Si estamos en el servidor, forzamos que la carpeta pública sea public_html
if (isset($_SERVER['DOCUMENT_ROOT']) && str_contains($_SERVER['DOCUMENT_ROOT'], 'public_html')) {
    $app->usePublicPath($_SERVER['DOCUMENT_ROOT']);
}

return $app;
