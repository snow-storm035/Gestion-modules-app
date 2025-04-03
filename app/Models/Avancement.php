<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avancement extends Model
{
    /** @use HasFactory<\Database\Factories\AvancementFactory> */
    use HasFactory;


    protected $table = "groupe_formateur_module";

    
    protected $fillable = [
        'code_module', 'code_filiere', 'code_formateur', 'code_groupe',
        'nbh_par_semaine_realisee', 'nbhp_realisee', 'nbhsync_realisee',
        'nbh_total_realisee', 'nbcc_realisee', 'efm_realise'
    ];


    

}
