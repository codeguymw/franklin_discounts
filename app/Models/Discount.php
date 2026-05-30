<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $fillable = [
        'partner_id', 
        'category_id', 
        'title', 
        'applies_to', 
        'type', 
        'value', 
        'frequency', 
        'is_featured'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'value' => 'float'
    ];

    // Change $table to $this here:
    public function partner() 
    {
        return $this->belongsTo(Partner::class);
    }

    // Change $table to $this here:
    public function category() 
    {
        return $this->belongsTo(Category::class);
    }
}