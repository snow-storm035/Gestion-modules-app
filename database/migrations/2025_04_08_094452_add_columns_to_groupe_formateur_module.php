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
            // dates de debut et fin d'un module au niveau de formation :
                $table->date('debut_module')->nullable()->after('nbh_par_semaine_total');
                $table->date('fin_module')->nullable()->after('debut_module');
    
                // dates efms :
                $table->date('date_efm_normal')->nullable()->after('fin_module');
                $table->date('date_efm_rattrapage')->nullable()->after('date_efm_normal');
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
