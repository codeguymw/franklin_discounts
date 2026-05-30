<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'icon_emoji'];

    public function discounts() {
        return $this->hasMany(Discount::class);
    }
}