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
        Schema::create('groupe_formateur_module', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('formateur_id')
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('groupe_id')
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->float('nbh_par_semaine_realisee');

            $table->float('nbhp_realisee');
            $table->float('nbhsync_realisee');
            $table->float('nbh_total_realisee');
            $table->float('nbcc_realisee');

            $table->boolean('efm_realise');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groupe_formateur_module');
    }
};
