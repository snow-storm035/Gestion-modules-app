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
        Schema::disableForeignKeyConstraints();
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->string('code_module');
            $table->string('libelle_module');
            $table->float('nbh_p'); // nombre heures en presentiel
            $table->float('nbh_sync'); // nombre heures en synchrone
            $table->float('nbh_async'); // nombre heures en asynchrone
            $table->float('nbh_total'); // nombre heures total
            // $table->integer('nbcc');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
