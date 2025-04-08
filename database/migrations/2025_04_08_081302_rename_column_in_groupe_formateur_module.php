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
        Schema::table('groupe_formateur_module', function (Blueprint $table) {
            //
            $table->renameColumn('nbh_par_semaine_realisee','nbh_par_semaine');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('groupe_formateur_module', function (Blueprint $table) {
            //
        });
    }
};
