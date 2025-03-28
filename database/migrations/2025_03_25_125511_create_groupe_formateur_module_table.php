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

            $table->string('code_module');
            $table->string('code_formateur'); 
            $table->string('code_groupe');



            $table->foreignId('module_id')
                ->default(null)
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');
            // $table->foreign("code_module")
            //     ->references("code_module")
            //     ->on('modules')
            //     ->onDelete('cascade')
            //     ->onUpdate('cascade');

            $table->foreign("code_formateur")
                ->references("code_formateur")
                ->on('formateurs')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign("code_groupe")
                ->references("code_groupe")
                ->on('groupes')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->primary(['code_module', 'code_formateur', 'code_groupe']);



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
