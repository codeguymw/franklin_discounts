<?php

namespace App\Http\Controllers\Admin; // 👈 1. Fixed: Added the \Admin namespace

use App\Http\Controllers\Controller;  // 👈 2. Fixed: Imported base Controller for sub-folders
use App\Models\Partner;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Redemption;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PartnerController extends Controller // 👈 3. Fixed: Changed to singular to match filename
{
    public function index()
    {
        // 1. Gather master collections
        $partners = Partner::with('discounts')->latest()->get();
        $categories = Category::all();
        $discounts = Discount::with(['partner', 'category'])->latest()->get();

        // 2. Calculate real collective financial volumes
        $totalSavings = (float) Redemption::where('status', 'approved')->sum('amount_saved');
        $pendingAudits = (int) Redemption::where('status', 'pending')->count();
        $totalClaims = (int) Redemption::where('status', 'approved')->count();

        // 3. Compute dynamic savings per category vertical from real claims data
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

        // Map through categories to format properly for the progress bars
        $categorySavingsArray = $categorySavingsData->map(function ($item) use ($totalSavings) {
            return [
                'label' => $item->icon_emoji . ' ' . $item->name,
                'amount' => (float) $item->total_saved,
                'percentage' => $totalSavings > 0 ? round(($item->total_saved / $totalSavings) * 100) : 0
            ];
        })->values()->all();

        // 4. Compute accurate Staff Engagement Registration rate
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
}