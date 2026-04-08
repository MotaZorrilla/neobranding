<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsEvent extends Model
{
    protected $fillable = [
        'type',
        'category',
        'label',
        'session_id',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    /**
     * Helper para registrar eventos rápidamente
     */
    public static function log($type, $category = null, $label = null, $metadata = [])
    {
        return self::create([
            'type' => $type,
            'category' => $category,
            'label' => $label,
            'session_id' => session()->getId(),
            'metadata' => array_merge([
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ], $metadata),
        ]);
    }
}
