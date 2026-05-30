<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('redemptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('discount_id')->constrained()->onDelete('cascade');
            
            // Financial Ledger Columns
            $table->decimal('total_spent', 10, 2);  // The full amount on the receipt
            $table->decimal('amount_saved', 10, 2); // The exact calculated dollar amount saved 
            
            // Proof of Transaction Verification Options [cite: 25]
            $table->string('verification_method');   // 'receipt_upload' or 'vendor_pin'
            $table->string('receipt_image_path')->nullable(); // Path to the file in storage 
            $table->string('used_vendor_code', 4)->nullable(); // Captures the exact code punched in [cite: 27]
            
            // Audit Lifecycle Status [cite: 35]
            $table->enum('status', ['pending', 'approved', 'declined'])->default('pending');
            $table->text('admin_notes')->nullable(); // Reason if declined
            $table->timestamp('reviewed_at')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('redemptions');
    }
};