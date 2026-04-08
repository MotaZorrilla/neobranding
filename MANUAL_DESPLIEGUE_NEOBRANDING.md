# 🚀 GUÍA DE DESPLIEGUE: NEOBRANDING 4.0 (PRO EDITION)

Este documento detalla la arquitectura, procesos y credenciales configuradas para el despliegue de **Neobranding 2.0** en un servidor VPS/Shared Hosting con estructura de seguridad avanzada.

---

## 🏛️ 1. ARQUITECTURA DE DIRECTORIOS (SEGURIDAD PRO)
Para proteger el código fuente y las configuraciones sensibles (`.env`), hemos dividido el proyecto en dos niveles:

### Nivel 1: El Corazón (`~/neo/`)
Ubicado **fuera** de la carpeta pública del servidor.
*   **Carpetas:** `app/`, `bootstrap/`, `config/`, `database/`, `resources/`, `routes/`, `storage/`, `vendor/`.
*   **Archivos:** `artisan`, `composer.json`, `.env`.

### Nivel 2: La Cara Pública (`~/public_html/`)
Ubicado en la raíz de acceso web.
*   **Carpetas:** `build/` (React Compilado), `images/`, `css/`, `js/`.
*   **Archivos:** `index.php`, `.htaccess`, `favicon.ico`.

---

## 🛠️ 2. CONFIGURACIONES CRÍTICAS REALIZADAS

### A. El Puente de Conexión (`bootstrap/app.php`)
Modificamos el arranque de Laravel 12 para que reconozca `public_html` como su carpeta de activos. Sin esto, React (Vite) daría error 500.
```php
// Al final de bootstrap/app.php
if (isset($_SERVER['DOCUMENT_ROOT']) && str_contains($_SERVER['DOCUMENT_ROOT'], 'public_html')) {
    $app->usePublicPath($_SERVER['DOCUMENT_ROOT']);
}
```

### B. El Enrutador Principal (`public_html/index.php`)
Ajustamos las rutas para que el servidor busque el núcleo de Laravel en la carpeta superior `../neo/`.
```php
require __DIR__.'/../neo/vendor/autoload.php';
(require_once __DIR__.'/../neo/bootstrap/app.php')->handleRequest(Request::capture());
```

---

## 🚀 3. PROCESO DE ACTUALIZACIÓN (FILEZILLA)

Si realizas cambios en el código local, sigue este flujo:

1.  **Compilar:** Ejecuta `npm run build` en tu PC.
2.  **Sincronizar UI:** Sube el contenido de tu carpeta local `public/build/` a `public_html/build/`.
3.  **Sincronizar Lógica:** Sube los archivos modificados de `app/`, `routes/` o `config/` a la carpeta `neo/` del servidor.

---

## 🛡️ 4. SCRIPTS DE MANTENIMIENTO (HERRAMIENTAS)

Creamos dos herramientas temporales para gestionar el servidor sin consola SSH:

1.  **`fix.php`:** Repara permisos de carpetas (755) y archivos (644).
2.  **`link.php`:** Crea el acceso directo para que los PDFs generados sean descargables desde la web.

> **⚠️ IMPORTANTE:** Borrar estos archivos de `public_html` una vez que la web esté operativa por seguridad.

---

## 📊 5. SISTEMA DE INTELIGENCIA ACTIVO

*   **Neo Assistant 2.0:** Chat con memoria persistente y libreto de ventas.
*   **Telemetría Nativa:** Registro de visitas y conversiones reales (Leads + Chats).
*   **Dossier VIP:** Generador de PDFs dinámicos con imágenes Base64 para máxima compatibilidad con DomPDF.
*   **Normalización:** Nombres en *Title Case* y Empresas en **MAYÚSCULAS**.

---

## 🔑 6. CREDENCIALES ADMINISTRATIVAS

*   **Entorno:** Producción (`neobranding.cl`)
*   **Ruta de Login:** `/login`
*   **Usuario:** `admin@neobranding.cl`
*   **Contraseña:** `NeoBranding2026!`

---

## ⚙️ 7. REQUISITOS DEL SERVIDOR
*   **PHP:** 8.2+
*   **Extensiones Obligatorias:** `GD` (Para procesamiento de imágenes en PDF), `BCMath`, `Ctype`, `JSON`, `Mbstring`, `OpenSSL`, `PDO`, `Tokenizer`, `XML`.

---
*Manual generado por el Asistente de Desarrollo para Neobranding - Abril 2026.*
