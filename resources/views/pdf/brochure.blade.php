<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        /* --- CONFIGURACIÓN MAESTRA (CARTA) --- */
        @page { margin: 0px; size: letter; }
        body { font-family: 'Helvetica', Arial, sans-serif; background-color: #020617; color: #ffffff; margin: 0px; padding: 0px; line-height: 1.4; }
        
        /* --- WRAPPERS DE SEGURIDAD --- */
        .page { position: relative; width: 100%; height: 1050px; overflow: hidden; page-break-after: always; }
        .content { padding: 50px 70px; position: relative; z-index: 10; }
        
        /* --- PORTADA --- */
        .cover-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; opacity: 0.6; }
        .cover-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2; background: linear-gradient(to bottom, transparent 0%, #020617 85%); }
        .cover-content { position: relative; z-index: 3; padding: 140px 70px; }
        .logo-box { background: #3b82f6; color: #fff; padding: 12px 25px; display: inline-block; font-weight: 900; letter-spacing: 5px; margin-bottom: 40px; font-size: 14px; }
        .title-hero { font-size: 75px; font-weight: 900; line-height: 0.85; text-transform: uppercase; }
        .proposal-tag { background: #ffffff; color: #020617; padding: 8px 15px; display: inline-block; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; }

        /* --- TIPOGRAFÍA ESTÁNDAR --- */
        .section-title { font-size: 38px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #3b82f6; padding-bottom: 8px; display: inline-block; margin-bottom: 25px; }
        .copy-large { font-size: 18px; color: #cbd5e1; line-height: 1.6; margin-bottom: 20px; }
        .copy-base { font-size: 16px; color: #94a3b8; line-height: 1.5; margin-bottom: 15px; }
        
        /* --- CARDS --- */
        .card { background: #0f172a; border: 1px solid #1e293b; padding: 25px; border-radius: 20px; margin-bottom: 15px; }
        .card-h { font-size: 15px; font-weight: 900; color: #3b82f6; text-transform: uppercase; margin-bottom: 10px; }
        .card-p { font-size: 15px; color: #cbd5e1; line-height: 1.5; }
        
        /* --- IMÁGENES --- */
        .img-container { border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); width: 100%; margin-bottom: 10px; }
        .img-container img { width: 100%; display: block; }
        .img-caption { padding: 10px 20px; font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: bold; background: #0f172a; }

        /* --- PIE DE PÁGINA --- */
        .footer { position: absolute; bottom: 35px; left: 70px; right: 70px; border-top: 2px solid #1e293b; padding-top: 15px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 900; }
        .client-tag { float: right; color: #3b82f6; }

        /* --- ROADMAPS (SIN DISTORSIÓN) --- */
        .roadmap-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; overflow: hidden; }
        .roadmap-img { height: 100%; width: auto; min-width: 100%; opacity: 0.1; } /* Asegura que cubra alto sin achatarse */
        .step { position: relative; padding-left: 50px; margin-bottom: 30px; }
        .step-num { position: absolute; left: 0; top: 0; width: 35px; height: 35px; background: #3b82f6; color: #000; border-radius: 50%; text-align: center; line-height: 35px; font-weight: 900; font-size: 18px; }
        .step-title { font-weight: 900; font-size: 22px; color: #fff; margin-bottom: 5px; text-transform: uppercase; }
        .step-desc { font-size: 16px; color: #cbd5e1; }

        /* --- CTA BOX --- */
        .cta-box { background: rgba(59, 130, 246, 0.1); border: 1px solid #3b82f6; padding: 20px; border-radius: 15px; text-align: center; margin-top: 20px; }
    </style>
</head>
<body>

    <!-- PÁGINA 1: PORTADA -->
    <div class="page">
        @if($img['why']) <img src="{{ $img['why'] }}" class="cover-img"> @endif
        <div class="cover-overlay"></div>
        <div class="cover-content">
            <div class="logo-box">NEOBRANDING</div>
            <div class="proposal-tag">Propuesta Estratégica</div>
            <h1 class="title-hero">INTELLIGENT<br><span class="text-blue">ECOSYSTEM</span><br>2026.</h1>
            
            <div style="margin-top: 130px; border-left: 4px solid #3b82f6; padding-left: 40px;">
                <div style="font-size: 12px; color: #64748b; margin-bottom: 10px;" class="uppercase font-black tracking-widest">Preparado exclusivamente para</div>
                <div style="font-size: 45px; font-weight: 900; line-height: 1;">{{ $name }}</div>
                <div style="font-size: 22px; color: #3b82f6; font-weight: bold; margin-top: 10px;" class="uppercase tracking-widest">{{ $company }}</div>
            </div>
        </div>
        <div class="footer">Confidential Insight // {{ $name }} - {{ $company }} <span class="client-tag">01</span></div>
    </div>

    <!-- PÁGINA 2: ESENCIA & POLÍTICAS -->
    <div class="page">
        <div class="content">
            <h2 class="section-title">Nuestra <span class="text-blue">Esencia</span></h2>
            <div class="copy-large text-justify">
                Estimado <strong>{{ $name }}</strong>, en <strong>Neobranding</strong> nuestra razón de ser es elevar el potencial de <strong>{{ $company }}</strong> mediante la convergencia de ingeniería avanzada y visión creativa. No entregamos productos aislados; diseñamos ecosistemas digitales vivos que permiten a nuestros aliados dominar sus mercados con autoridad, fluidez y una eficiencia tecnológica sin precedentes. Nuestra trayectoria se define por la humanización de la tecnología al servicio de marcas con propósito.
            </div>

            <h2 class="section-title" style="margin-top: 30px;">Políticas de <span class="text-blue">Excelencia</span></h2>
            <div class="card">
                <div class="card-h">Compromiso Neobranding 2026</div>
                <div class="card-p">
                    • <strong>Transparencia Radical:</strong> {{ $name }}, garantizamos visibilidad total de cada Sprint y proceso técnico, asegurando que {{ $company }} mantenga el control estratégico del proyecto.<br><br>
                    • <strong>Seguridad Integral:</strong> Implementamos cifrado AES-256 y protocolos de seguridad multicapa para blindar cada activo digital de {{ $company }} contra amenazas modernas.<br><br>
                    • <strong>Propiedad Intelectual:</strong> Al cierre de cada hito, Neobranding entrega la totalidad de derechos, códigos fuente y activos técnicos, que pasan a ser patrimonio exclusivo de {{ $company }}.<br><br>
                    • <strong>Soporte Proactivo:</strong> No esperamos reportes; nuestro sistema de monitoreo 24/7 garantiza que la infraestructura de {{ $company }} opere con un uptime real del 99.98%.
                </div>
            </div>
        </div>
        <div class="footer">{{ $name }} // {{ $company }} <span class="client-tag">02</span></div>
    </div>

    @if(in_array('software', $interests) || in_array('all', $interests))
    <!-- PÁGINA 3: SOFTWARE LAB -->
    <div class="page">
        <div class="content">
            <h2 class="section-title">Software <span class="text-blue">Lab</span></h2>
            <p class="copy-large">
                {{ $name }}, transformamos la operatividad de {{ $company }} en una ventaja competitiva mediante software a medida de alto rendimiento y arquitectura inteligente.
            </p>

            <div class="card">
                <div class="card-h">Arquitectura de Alto Impacto</div>
                <div class="card-p">
                    Desarrollamos ecosistemas basados en microservicios escalables utilizando el stack líder <strong>Laravel + React</strong>. Nuestra ingeniería inyecta inteligencia artificial mediante modelos <strong>Gemini</strong>, permitiendo automatizar flujos de trabajo críticos, toma de decisiones basada en datos y una experiencia de usuario que posiciona a {{ $company }} en la vanguardia digital.
                </div>
            </div>

            <div class="img-container">
                @if($img['skills']) <img src="{{ $img['skills'] }}"> @endif
                <div class="img-caption">Engineering Environment // Enterprise Software Development</div>
            </div>

            <div class="cta-box">
                <div class="card-p" style="font-weight: bold;">{{ $name }}, ¿escalamos la infraestructura de {{ $company }} hoy mismo?</div>
            </div>
        </div>
        <div class="footer">Software Engineering // {{ $company }} <span class="client-tag">03</span></div>
    </div>

    <!-- PÁGINA 4: ROADMAP SOFTWARE -->
    <div class="page">
        <div class="roadmap-container">
            @if($img['skills']) <img src="{{ $img['skills'] }}" class="roadmap-img"> @endif
        </div>
        <div class="content">
            <h2 class="section-title">Roadmap: <span class="text-blue">Software</span></h2>
            <div style="margin-top: 40px;">
                <div class="step"><div class="step-num">1</div><div class="step-title">Arquitectura</div><div class="step-desc">Diseño del ecosistema lógico para {{ $company }}.</div></div>
                <div class="step"><div class="step-num">2</div><div class="step-title">Desarrollo & IA</div><div class="step-desc">Construcción core e inyección de modelos Gemini.</div></div>
                <div class="step"><div class="step-num">3</div><div class="step-title">QA & Seguridad</div><div class="step-desc">Pruebas de estrés y blindaje de datos corporativos.</div></div>
                <div class="step"><div class="step-num">4</div><div class="step-title">Deploy</div><div class="step-desc">Lanzamiento oficial y escalamiento de {{ $company }}.</div></div>
            </div>
        </div>
        <div class="footer">Software Lifecycle // {{ $name }} <span class="client-tag">04</span></div>
    </div>
    @endif

    @if(in_array('engineering', $interests) || in_array('all', $interests))
    <!-- PÁGINA 5: PROJECT ENGINEERING -->
    <div class="page">
        <div class="content">
            <h2 class="section-title">Project <span class="text-blue">Engineering</span></h2>
            <div class="copy-large">
                {{ $name }}, garantizamos la viabilidad técnica y rentabilidad de los activos de {{ $company }} mediante ingeniería de precisión aplicada a la infraestructura.
            </div>

            <div class="card" style="border-left-color: #a855f7;">
                <div class="card-h">Planificación & Cálculo Estructural</div>
                <div class="card-p">
                    Nuestra división de ingeniería se especializa en la gestión técnica de proyectos de gran escala. Desde el cálculo de estructuras hasta la supervisión de estándares internacionales, aseguramos que cada fase del proyecto de {{ $company }} cumpla con los más altos niveles de seguridad, optimización de recursos y excelencia operativa en terreno.
                </div>
            </div>

            <div class="img-container">
                @if($img['apartamento']) <img src="{{ $img['apartamento'] }}" style="height: 300px; object-fit: cover;"> @endif
                <div class="img-caption">Structural Analysis // Engineering Data Modeling</div>
            </div>

            <div class="cta-box" style="border-color: #a855f7; margin-top: 15px;">
                <div class="card-p" style="font-weight: bold;">Precisión técnica para los activos de {{ $company }}</div>
            </div>
        </div>
        <div class="footer">Engineering Services // {{ $company }} <span class="client-tag">05</span></div>
    </div>

    <!-- PÁGINA 6: ROADMAP ENGINEERING -->
    <div class="page">
        <div class="roadmap-container">
            @if($img['apartamento']) <img src="{{ $img['apartamento'] }}" class="roadmap-img"> @endif
        </div>
        <div class="content">
            <h2 class="section-title">Roadmap: <span class="text-blue">Engineering</span></h2>
            <div style="margin-top: 40px;">
                <div class="step"><div class="step-num">1</div><div class="step-title">Viabilidad</div><div class="step-desc">Estudio técnico y levantamiento para {{ $company }}.</div></div>
                <div class="step"><div class="step-num">2</div><div class="step-title">Cálculo</div><div class="step-desc">Modelado de datos estructurales y planos técnicos.</div></div>
                <div class="step"><div class="step-num">3</div><div class="step-title">Supervisión</div><div class="step-desc">Gestión directa de ejecución y auditoría de proveedores.</div></div>
                <div class="step"><div class="step-num">4</div><div class="step-title">Entrega</div><div class="step-desc">Certificación y puesta en marcha para {{ $company }}.</div></div>
            </div>
        </div>
        <div class="footer">Lifecycle Engineering // {{ $name }} <span class="client-tag">06</span></div>
    </div>
    @endif

    @if(in_array('renders', $interests) || in_array('all', $interests))
    <!-- PÁGINA 7: RENDERS -->
    <div class="page">
        <div class="content">
            <h2 class="section-title">Visual <span class="text-blue">Realism</span></h2>
            <div class="copy-large">
                {{ $name }}, venda el futuro de {{ $company }} hoy mismo mediante experiencias visuales que impactan las emociones y aceleran el cierre de negocios. 
            </div>
            
            <div class="card">
                <div class="card-h">Tecnología de Vanguardia</div>
                <div class="card-p">
                    En Neobranding, estamos al día con la tecnología de vanguardia en renderizado y animaciones 3D. Utilizamos motores de última generación con trazado de rayos (Ray Tracing) para lograr una fidelidad lumínica absoluta, permitiendo a sus clientes vivir el espacio antes de la primera piedra.
                </div>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="width: 48%; padding-right: 15px;">
                        <div class="img-container">@if($img['posada']) <img src="{{ $img['posada'] }}"> @endif<div class="img-caption">Interior Visualization</div></div>
                    </td>
                    <td style="width: 48%;">
                        <div class="img-container">@if($img['fachada']) <img src="{{ $img['fachada'] }}"> @endif<div class="img-caption">Cinematic Exterior Impact</div></div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="footer">Visual Realism // {{ $company }} <span class="client-tag">07</span></div>
    </div>
    @endif

    @if(in_array('branding', $interests) || in_array('all', $interests))
    <!-- PÁGINA 8: BRAND INTELLIGENCE -->
    <div class="page">
        <div class="roadmap-container">
            @if($img['why']) <img src="{{ $img['why'] }}" class="roadmap-img" style="opacity: 0.25;"> @endif
        </div>
        <div class="content">
            <h2 class="section-title">Brand <span class="text-blue">Intelligence</span></h2>
            <div class="copy-large">
                Hagamos que la marca de {{ $company }} sea inolvidable. Fusionamos la profundidad de la psicología estratégica con un diseño visual disruptivo y escalable.
            </div>

            <div class="card" style="background: rgba(15, 23, 42, 0.85);">
                <div class="card-h">Estrategia de Posicionamiento Mundial</div>
                <div class="card-p">
                    {{ $name }}, diseñamos identidades que proyectan autoridad inmediata en mercados globales. Nuestra estrategia para {{ $company }} se basa en el modelado del DNA de marca, creando sistemas visuales coherentes que aumentan el valor percibido y generan una conexión emocional inquebrantable con sus clientes finales.
                </div>
            </div>
        </div>
        <div class="footer">Brand Strategy // {{ $company }} <span class="client-tag">08</span></div>
    </div>
    @endif

    <!-- PÁGINA 9: HOSTING & SOLUCIONES -->
    <div class="page">
        <div class="content">
            <h2 class="section-title">Hosting & <span class="text-blue">Solutions</span></h2>
            <div class="copy-large">
                La base operativa de {{ $company }} merece estabilidad total y una infraestructura de clase mundial que garantice la continuidad del negocio.
            </div>

            <div class="card">
                <div class="card-h">Nodos Globales Neobranding</div>
                <div class="card-p">
                    Contamos con infraestructura de servidores propia en <strong>EE.UU, Argentina, Chile y Venezuela</strong>, lo que nos permite ofrecer una latencia mínima y redundancia geográfica para {{ $company }}. Nuestras soluciones incluyen almacenamiento NVMe de ultra-velocidad, monitoreo activo de red y soporte senior dedicado para que sus activos digitales nunca se detengan.
                </div>
            </div>

            <div class="img-container">
                @if($img['partner4']) <img src="{{ $img['partner4'] }}" style="height: 150px; object-fit: contain; background: #fff;"> @endif
                <div class="img-caption">Global Cloud Infrastructure // Powering {{ $company }}</div>
            </div>
        </div>
        <div class="footer">Hosting Solutions // {{ $company }} <span class="client-tag">09</span></div>
    </div>

    <!-- PÁGINA 10: CONFIANZA & ALIADOS -->
    <div class="page">
        <div class="content">
            <h2 class="section-title">Alianzas & <span class="text-blue">Confianza</span></h2>
            <p class="copy-base">{{ $name }}, en Neobranding creemos en la fuerza de los ecosistemas colaborativos.</p>

            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="width: 25%; padding: 8px;"><img src="{{ $img['partner1'] }}" style="width: 100%; border-radius: 12px;"></td>
                    <td style="width: 25%; padding: 8px;"><img src="{{ $img['partner2'] }}" style="width: 100%; border-radius: 12px;"></td>
                    <td style="width: 25%; padding: 8px;"><img src="{{ $img['partner3'] }}" style="width: 100%; border-radius: 12px;"></td>
                    <td style="width: 25%; padding: 8px;"><img src="{{ $img['partner4'] }}" style="width: 100%; border-radius: 12px;"></td>
                </tr>
                <tr>
                    <td style="width: 25%; padding: 8px;"><img src="{{ $img['partner5'] }}" style="width: 100%; border-radius: 12px;"></td>
                    <td style="width: 25%; padding: 8px;"><img src="{{ $img['partner6'] }}" style="width: 100%; border-radius: 12px;"></td>
                    <td style="width: 25%; padding: 8px;"><img src="{{ $img['partner7'] }}" style="width: 100%; border-radius: 12px;"></td>
                    <td style="width: 25%; padding: 8px;"><img src="{{ $img['partner8'] }}" style="width: 100%; border-radius: 12px;"></td>
                </tr>
            </table>

            <div class="card" style="margin-top: 40px; text-align: center; background: #3b82f6;">
                <div style="font-size: 24px; font-weight: 900; color: #000;" class="uppercase">Más de 100 clientes satisfechos</div>
            </div>
        </div>
        <div class="footer">Partnership // Trust <span class="client-tag">10</span></div>
    </div>

    <!-- PÁGINA 11: CONTRAPORTADA -->
    <div class="page" style="background-color: #020617; text-align: center; page-break-after: avoid;">
        <div style="padding-top: 280px; padding-left: 70px; padding-right: 70px;">
            <div class="logo-box">CONTACT US</div>
            <h1 class="title-hero">LET'S BUILD<br>THE FUTURE OF<br><span class="text-blue">{{ $company }}</span></h1>
            <div style="margin-top: 60px;">
                <div style="font-size: 30px; font-weight: 900;">{{ $email }}</div>
                <div style="font-size: 14px; color: #3b82f6; font-weight: bold; margin-top: 15px;" class="uppercase tracking-widest">Santiago, Chile // 2026</div>
            </div>
            <div style="margin-top: 80px; border: 2px solid #1e293b; display: inline-block; padding: 25px 50px; border-radius: 25px;">
                <div style="font-size: 12px; color: #475569; margin-bottom: 5px;" class="uppercase font-black">Strategic Consultant for {{ $company }}</div>
                <div style="font-size: 24px; font-weight: 900; color: #fff;">{{ $name }}</div>
            </div>
        </div>
    </div>

</body>
</html>
