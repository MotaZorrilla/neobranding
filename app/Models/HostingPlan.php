<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HostingPlan extends Model
{
    protected $fillable = [
        'name',
        'space',
        'price_usd',
        'price_clp',
        'is_active',
        'sort_order',
    ];
}
