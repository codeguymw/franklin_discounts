<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Partner;
use App\Models\Discount;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users Setup
        User::create([
            'name' => 'Admin',
            'email' => 'admin@franklin.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
            'status' => 'approved'
        ]);

        User::create([
            'name' => 'Sarah Caregiver',
            'email' => 'sarah@franklin.com',
            'password' => Hash::make('password'),
            'is_admin' => false,
            'status' => 'approved'
        ]);

        // Default Categories Matrix
        $food = Category::create(['name' => 'Food & Dining', 'icon_emoji' => '🍔']);
        $health = Category::create(['name' => 'Health & Wellness', 'icon_emoji' => '❤️']);
        $retail = Category::create(['name' => 'Retail', 'icon_emoji' => '🛍️']);

        // Default Partners Setup
        $star = Partner::create([
            'name' => 'Star Coffee',
            'address' => '123 Main St, Franklin',
            'phone_number' => '(555) 123-4567',
            'partner_code' => '4091'
        ]);

        $pizzeria = Partner::create([
            'name' => 'Pizzeria Bella',
            'address' => '789 Oak Ave, Franklin',
            'phone_number' => '(555) 987-6543',
            'partner_code' => '1102'
        ]);

        // Attaching High-Fidelity Mockup Discounts
        Discount::create([
            'partner_id' => $star->id,
            'category_id' => $food->id,
            'title' => '15% OFF',
            'applies_to' => 'All Drinks',
            'type' => 'percentage',
            'value' => 15.00,
            'is_featured' => true
        ]);

        Discount::create([
            'partner_id' => $pizzeria->id,
            'category_id' => $food->id,
            'title' => '25% OFF',
            'applies_to' => 'Pizzeria Bella',
            'type' => 'percentage',
            'value' => 25.00,
            'is_featured' => true
        ]);
    }
}