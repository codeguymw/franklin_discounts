<?php

namespace App\Http\Controllers\Admin; 

use App\Http\Controllers\Controller;  
use App\Models\Partner;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Redemption;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PartnerController extends Controller 
{
    public function index()
    {
        // 1. Gather master collections[cite: 1]
        $partners = Partner::with('discounts')->latest()->get();
        $categories = Category::all();
        $discounts = Discount::with(['partner', 'category'])->latest()->get();

        // 2. Calculate real collective financial volumes[cite: 1]
        $totalSavings = (float) Redemption::where('status', 'approved')->sum('amount_saved');
        $pendingAudits = (int) Redemption::where('status', 'pending')->count();
        $totalClaims = (int) Redemption::where('status', 'approved')->count();

        // 3. Compute dynamic savings per category vertical from real claims data[cite: 1]
        $categorySavingsData = DB::table('redemptions')
            ->join('discounts', 'redemptions.discount_id', '=', 'discounts.id')
            ->join('categories', 'discounts.category_id', '=', 'categories.id')
            ->where('redemptions.status', 'approved')
            ->select(
                'categories.name',
                'categories.icon_emoji',
                DB::raw('SUM(redemptions.amount_saved) as total_saved')
            )
            ->groupBy('categories.id', 'categories.name', 'categories.icon_emoji')
            ->get();

        // Map through categories to format properly for the progress bars[cite: 1]
        $categorySavingsArray = $categorySavingsData->map(function ($item) use ($totalSavings) {
            return [
                'label' => $item->icon_emoji . ' ' . $item->name,
                'amount' => (float) $item->total_saved,
                'percentage' => $totalSavings > 0 ? round(($item->total_saved / $totalSavings) * 100) : 0
            ];
        })->values()->all();

        // 4. Compute accurate Staff Engagement Registration rate[cite: 1]
        $totalStaffCount = User::count();
        $approvedStaffCount = User::where('status', 'approved')->count();
        $engagementPercentage = $totalStaffCount > 0 ? round(($approvedStaffCount / $totalStaffCount) * 100) : 0;

        return Inertia::render('Admin/Partners', [
            'partners' => $partners,
            'categories' => $categories,
            'discounts' => $discounts,
            'reports' => [
                'total_company_savings' => $totalSavings,
                'pending_audit_count' => $pendingAudits,
                'total_transactions_count' => $totalClaims,
                'category_savings' => $categorySavingsArray,
                'engagement_percentage' => $engagementPercentage, 
            ],
            'recent_redemptions' => Redemption::with(['user', 'discount.partner'])
                ->latest()
                ->take(10)
                ->get(),
            'pending_users' => User::where('status', 'pending')->get()
        ]);
    }

    // ðŸ‘‡ ADDED: Missing Partner logic with File Upload[cite: 5, 6]
    public function storePartner(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'partner_code' => 'required|string|size:4',
            'logo' => 'nullable|image|max:2048', 
        ]);

        $partnerData = [
            'name' => $validated['name'],
            'address' => $validated['address'],
            'phone_number' => $validated['phone_number'],
            'partner_code' => $validated['partner_code'],
        ];

        // Process the Brand Identity Logo File if it was uploaded[cite: 5]
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('partners', 'public');
            $partnerData['logo_path'] = '/storage/' . $path; 
        }

        Partner::create($partnerData);

        return redirect()->back();
    }

    // ðŸ‘‡ ADDED: Missing Category Logic[cite: 5, 6]
    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon_emoji' => 'required|string|max:10',
        ]);

        Category::create($validated);

        return redirect()->back();
    }

    // ðŸ‘‡ ADDED: Missing Discount Logic[cite: 5, 6]
    public function storeDiscount(Request $request)
    {
        $validated = $request->validate([
            'partner_id' => 'required|exists:partners,id',
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'applies_to' => 'required|string|max:255',
            'type' => 'required|string|in:percentage,flat_rate',
            'value' => 'required|numeric',
            'is_featured' => 'boolean',
        ]);

        Discount::create($validated);

        return redirect()->back();
    }

    // ðŸ‘‡ ADDED: Missing Audit Logic for the proof stream[cite: 5, 6]
    public function auditReceipt(Request $request, Redemption $redemption)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,declined',
            'admin_notes' => 'nullable|string',
        ]);

        $redemption->update([
            'status' => $validated['status'],
            'admin_notes' => $validated['admin_notes'] ?? 'Verified by Corporate Audit'
        ]);

        return redirect()->back();
    }
}