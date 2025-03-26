<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Module extends Model
{
    /** @use HasFactory<\Database\Factories\ModuleFactory> */
    use HasFactory;

    protected $primaryKey = "code_module";
    public $incrementing = false;
    protected $keyType = 'string';


    public function formateurs() : BelongsToMany
    {
        return $this->belongsToMany(Formateur::class, 'groupe_formateur_module', 'code_module', 'code_formateur')
            ->withPivot('code_groupe', 'nbh_par_semaine_realisee', 'nbhp_realisee', 'nbhsync_realisee', 'nbh_total_realisee', 'nbcc_realisee', 'efm_realise')
            ->withTimestamps();
    }

    public function groupes() : BelongsToMany
    {
        return $this->belongsToMany(Groupe::class, 'groupe_formateur_module', 'code_module', 'code_groupe')
            ->withPivot('code_formateur', 'nbh_par_semaine_realisee', 'nbhp_realisee', 'nbhsync_realisee', 'nbh_total_realisee', 'nbcc_realisee', 'efm_realise')
            ->withTimestamps();
    }
}
