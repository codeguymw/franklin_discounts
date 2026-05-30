<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Admin\EmployeeApprovalController;
use App\Http\Controllers\Admin\PartnerController;
use App\Models\Partner;
use App\Http\Controllers\RedemptionController;

Route::get('/', function () {
    return redirect()->route('login');
});

// 2. CHANGED: This acts as our "Traffic Controller" landing pad.
// When anyone hits '/dashboard', it instantly routes admins to their portal
// and lets regular approved employees see their mobile web application.
Route::get('/dashboard', function () {
    $user = Auth::user();
    if ($user->is_admin) {
        return redirect()->route('admin.approvals');
    }

    return Inertia::render('Dashboard', [
        'categories' => \App\Models\Category::all(),
        'featuredDiscounts' => \App\Models\Discount::with('partner')->where('is_featured', true)->latest()->get(),
        'allDiscounts' => \App\Models\Discount::with('partner')->latest()->get(),
        'myRedemptions' => \App\Models\Redemption::with('discount.partner')
                                ->where('user_id', $user->id)
                                ->latest()
                                ->get(),
        
        'notifications' => $user->notifications()->take(20)->get()->map(function($notification) {
            return [
                'id' => $notification->id,
                'title' => $notification->data['title'] ?? 'Notification',
                'message' => $notification->data['message'] ?? '',
                'action_url' => $notification->data['action_url'] ?? '#',
                'read_at' => $notification->read_at,
                'created_at' => $notification->created_at->diffForHumans(),
            ];
        }),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// 👤 Worker / Employee Profile Space
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/redemptions', [RedemptionController::class, 'store'])->name('redemptions.store');
    Route::post('/notifications/{id}/mark-as-read', function ($id) {
        Auth::user()->unreadNotifications->where('id', $id)->markAsRead();
        return redirect()->back();
    })->name('notifications.read');
});

// 🛠️ Admin Vault (Protected by 'admin' middleware)
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
   Route::prefix('admin')->group(function () {
        Route::get('/approvals', [EmployeeApprovalController::class, 'index'])->name('admin.approvals');
        Route::post('/approvals/{user}/approve', [EmployeeApprovalController::class, 'approve'])->name('admin.approve');
        Route::post('/approvals/{user}/reject', [EmployeeApprovalController::class, 'reject'])->name('admin.reject');

        // Enterprise Configuration Engine Endpoints
        Route::get('/partners', [PartnerController::class, 'index'])->name('admin.partners');
        Route::post('/partners/store', [PartnerController::class, 'storePartner'])->name('admin.partners.store');
        Route::post('/discounts/store', [PartnerController::class, 'storeDiscount'])->name('admin.discounts.store');
        // Dynamic category addition
        Route::post('/categories/store', [PartnerController::class, 'storeCategory'])->name('admin.categories.store');
        Route::post('/redemptions/{redemption}/audit', [PartnerController::class, 'auditReceipt'])->name('admin.redemptions.audit');
    });
});

require __DIR__.'/auth.php';