<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Avancement extends Model
{
    /** @use HasFactory<\Database\Factories\AvancementFactory> */
    use HasFactory;


    protected $table = "groupe_formateur_module";

    
    protected $primaryKey = ['code_module', 'code_groupe', 'code_formateur'];
    public $incrementing = false;
    protected $keyType = 'string';

    
    protected $fillable = [
        'code_module', 'code_filiere', 'code_formateur', 'code_groupe',
        'nbh_par_semaine_realisee', 'nbhp_realisee', 'nbhsync_realisee',
        'nbh_total_realisee', 'nbcc_realisee', 'efm_realise'
    ];


    public static function findWithCompositeKey(Array $query){  
        Avancement::where($query)
            ->first();
    }

    public static function updateWithCompositeKey(Array $query, Array $options) {
        DB::table('groupe_formateur_module')
        ->where($query)
        ->update($options);
    }
}
