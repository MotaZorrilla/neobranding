<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="{{ asset('images/icono.png') }}">
        <link rel="apple-touch-icon" href="{{ asset('images/icono.png') }}">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:title" content="Neobranding - Impulsamos tu Transformación Digital">
        <meta property="og:description" content="Branding Estratégico y Diseño Web de Alto Impacto. Ayudamos a emprendedores y PYMES a convertir visitantes en clientes.">
        <meta property="og:image" content="{{ asset('images/hero.png') }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ config('app.url') }}">
        <meta property="twitter:title" content="Neobranding - Impulsamos tu Transformación Digital">
        <meta property="twitter:description" content="Branding Estratégico y Diseño Web de Alto Impacto. Ayudamos a emprendedores y PYMES a convertir visitantes en clientes.">
        <meta property="twitter:image" content="{{ asset('images/hero.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <!--
        ========================================================================================

          ███╗   ███╗  ██████╗  ████████╗  █████╗  ███████╗
          ████╗ ████║ ██╔═══██╗ ╚══██╔══╝ ██╔══██╗ ╚══███╔╝
          ██╔████╔██║ ██║   ██║    ██║    ███████║   ███╔╝ 
          ██║╚██╔╝██║ ██║   ██║    ██║    ██╔══██║  ███╔╝  
          ██║ ╚═╝ ██║ ╚██████╔╝    ██║    ██║  ██║ ███████╗
          ╚═╝     ╚═╝  ╚═════╝     ╚═╝    ╚═╝  ╚═╝ ╚══════╝

        ========================================================================================
           Developed by @MotaZorrilla
        ========================================================================================
        -->
        @inertia
    </body>
</html>
