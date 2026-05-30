<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = ['name', 'logo_path', 'address', 'phone_number', 'partner_code'];

    public function discounts() {
        return $this->hasMany(Discount::class);
    }
}