<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analytics_events', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // view, click, conversion
            $table->string('category')->nullable(); // whatsapp, neo, lead, navigation
            $table->string('label')->nullable(); // "Plan Pro", "Section About"
            $table->string('session_id')->nullable()->index();
            $table->json('metadata')->nullable(); // IP, User Agent, Country
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analytics_events');
    }
};
