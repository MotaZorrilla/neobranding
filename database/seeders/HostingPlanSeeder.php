<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HostingPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\HostingPlan::create([
            'name' => 'Plan 2 GB',
            'space' => '2 GB',
            'price_usd' => 45.00,
            'price_clp' => 42750,
            'sort_order' => 1
        ]);

        \App\Models\HostingPlan::create([
            'name' => 'Plan 3 GB',
            'space' => '3 GB',
            'price_usd' => 54.00,
            'price_clp' => 51300,
            'sort_order' => 2
        ]);

        \App\Models\HostingPlan::create([
            'name' => 'Plan 30 GB',
            'space' => '30 GB',
            'price_usd' => 150.00,
            'price_clp' => 142500,
            'sort_order' => 3
        ]);
    }
}
