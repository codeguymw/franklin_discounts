<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
    {
        // Force drop any old conflicting schemas before rebuilding cleanly
        Schema::dropIfExists('redemptions');
        Schema::dropIfExists('discounts');
        Schema::dropIfExists('partners');
        Schema::dropIfExists('categories');

        // 1. Dynamic Categories Table
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('icon_emoji')->default('🏷️');
            $table->timestamps();
        });

        // 2. Comprehensive Partners Registry
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo_path')->nullable();
            $table->string('address')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('partner_code', 4)->unique();
            $table->timestamps();
        });

        // 3. Granular Discounts Matrix
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partner_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('applies_to');
            $table->enum('type', ['percentage', 'flat_rate']);
            $table->decimal('value', 8, 2);
            $table->enum('frequency', ['recurring', 'one_time'])->default('recurring');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('discounts');
        Schema::dropIfExists('partners');
        Schema::dropIfExists('categories');
    }
};