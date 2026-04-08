<?php

namespace App\Http\Controllers;

use App\Models\HostingPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HostingPlanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/HostingPlans', [
            'hostingPlans' => HostingPlan::orderBy('sort_order')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'space' => 'required|string|max:255',
            'price_usd' => 'required|numeric',
            'price_clp' => 'required|numeric',
            'sort_order' => 'integer',
        ]);

        HostingPlan::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, HostingPlan $hostingPlan)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'space' => 'required|string|max:255',
            'price_usd' => 'required|numeric',
            'price_clp' => 'required|numeric',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $hostingPlan->update($validated);

        return redirect()->back();
    }

    public function destroy(HostingPlan $hostingPlan)
    {
        $hostingPlan->delete();

        return redirect()->back();
    }
}
