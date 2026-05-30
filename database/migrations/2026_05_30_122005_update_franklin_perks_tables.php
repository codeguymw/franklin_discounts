<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. UPDATED DISCOUNTS TABLE
        Schema::table('discounts', function (Blueprint $table) {
            if (!Schema::hasColumn('discounts', 'is_featured')) {
                $table->boolean('is_featured')->default(false)->after('applies_to');
            }
        });

        // 2. UPDATED USERS TABLE
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'employee_id')) {
                $table->string('employee_id')->nullable()->after('email');
            }
            if (!Schema::hasColumn('users', 'status')) {
                $table->string('status')->default('pending')->after('employee_id');
            }
        });

        // 3. COMPLETE REDEMPTIONS PIPELINE TABLE
        if (!Schema::hasTable('redemptions')) {
            Schema::create('redemptions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->foreignId('discount_id')->constrained()->onDelete('cascade');
                $table->decimal('total_spent', 10, 2);
                $table->decimal('amount_saved', 10, 2);
                $table->string('verification_method'); // receipt_upload, vendor_pin
                $table->string('receipt_image_path')->nullable();
                $table->string('status')->default('pending'); // pending, approved, declined
                $table->text('admin_notes')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('redemptions');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['employee_id', 'status']);
        });

        Schema::table('discounts', function (Blueprint $table) {
            $table->dropColumn('is_featured');
        });
    }
};