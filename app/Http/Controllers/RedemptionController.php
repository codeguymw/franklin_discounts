<?php

namespace App\Http\Controllers;

use App\Models\Redemption;
use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\BenefitNotification;

class RedemptionController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validate the incoming payload from the mobile app
        $validated = $request->validate([
            'discount_id' => 'required|exists:discounts,id',
            'total_spent' => 'required|numeric|min:0',
            'verification_method' => 'required|in:receipt_upload,vendor_pin',
            'receipt_image' => 'nullable|image|max:5120|required_if:verification_method,receipt_upload',
            'vendor_pin' => 'nullable|string|size:4|required_if:verification_method,vendor_pin',
        ]);

        $discount = Discount::with('partner')->findOrFail($validated['discount_id']);

        // 2. Utilize the High-Fidelity Auto-Calculation Engine we built in your model
        $amountSaved = Redemption::calculateSavings($discount->id, $validated['total_spent']);

        $status = 'pending';
        $receiptPath = null;
        $usedPin = null;

        // 3. Process based on the verification workflow chosen [cite: 24]
        if ($validated['verification_method'] === 'receipt_upload') {
            // Handle image upload [cite: 26, 46]
            $path = $request->file('receipt_image')->store('receipts', 'public');
            $receiptPath = '/storage/' . $path;
            $status = 'pending'; // Requires Admin Audit [cite: 35]
            
        } elseif ($validated['verification_method'] === 'vendor_pin') {
            // Verify the PIN matches the partner's secret code [cite: 27]
            if ($validated['vendor_pin'] !== $discount->partner->partner_code) {
                return back()->withErrors(['vendor_pin' => 'The vendor PIN entered is incorrect.']);
            }
            $usedPin = $validated['vendor_pin'];
            $status = 'approved'; // PINs are pre-verified by the merchant, so instant approval
        }

        // 4. Permanently log the transaction to the database ledger 
        Redemption::create([
            'user_id' => Auth::id(),
            'discount_id' => $discount->id,
            'total_spent' => $validated['total_spent'],
            'amount_saved' => $amountSaved,
            'verification_method' => $validated['verification_method'],
            'receipt_image_path' => $receiptPath,
            'used_vendor_code' => $usedPin,
            'status' => $status,
        ]);

        $user = Auth::user();

        if ($status === 'approved') {
            $user->notify(new BenefitNotification(
                'Redemption Approved! 🎉',
                "Your redemption for {$discount->title} was instantly verified via PIN code. Saved $" . number_format($amountSaved, 2),
                '/dashboard'
            ));
        } else {
            $user->notify(new BenefitNotification(
                'Receipt Submitted 📄',
                "Your receipt for {$discount->title} has been submitted to Head Office and is pending review.",
                '/dashboard'
            ));
        }

        // Redirect back to the dashboard; Inertia will automatically pick up the new data
        return redirect()->back();
    }
}