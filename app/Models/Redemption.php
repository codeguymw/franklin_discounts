<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Redemption extends Model
{
    protected $fillable = [
        'user_id', 'discount_id', 'total_spent', 'amount_saved', 
        'verification_method', 'receipt_image_path', 'used_vendor_code', 'status'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function discount() {
        return $this->belongsTo(Discount::class);
    }

    // High-Fidelity Auto-Calculation Engine
    public static function calculateSavings($discountId, $totalSpent)
    {
        $discount = Discount::findOrFail($discountId);

        if ($discount->type === 'percentage') {
            return ($totalSpent * ($discount->value / 100));
        }

        // Flat Rate (cap savings at the total spent amount just in case)
        return min($discount->value, $totalSpent);
    }
}