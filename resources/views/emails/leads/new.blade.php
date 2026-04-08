<x-mail::message>
# Nuevo Mensaje Recibido 🚀

Tienes una nueva oportunidad de negocio en el ecosistema **Neobranding**.

<x-mail::panel>
**Detalles del Prospecto:**
- **Nombre:** {{ $lead->name }}
- **Email:** {{ $lead->email }}
- **Teléfono:** {{ $lead->phone ?? 'No especificado' }}
- **Interés:** {{ $lead->service }}
</x-mail::panel>

**Mensaje del Cliente:**
> "{{ $lead->message }}"

<x-mail::button :url="$url">
Ver en el Panel CRM
</x-mail::button>

Desarrollado por el Software Lab de Neobranding.<br>
{{ config('app.name') }}
</x-mail::message>
