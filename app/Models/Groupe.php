<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Groupe extends Model
{
    /** @use HasFactory<\Database\Factories\GroupeFactory> */
    use HasFactory;


    protected $fillable = [
        "code_filiere",
        "code_groupe",
        "niveau",
        "effectif",
        "annee_formation",
        "status_groupe",
        "mode",
        "creneau"
    ];


    protected $primaryKey = "code_groupe";
    public $incrementing = false;
    protected $keyType = 'string';


    public function modules() : BelongsToMany
    {
        return $this->belongsToMany(Module::class, 'groupe_formateur_module', 'code_groupe', 'code_module')
            ->withPivot('code_formateur', 'nbh_par_semaine_realisee', 'nbhp_realisee', 'nbhsync_realisee', 'nbh_total_realisee', 'nbcc_realisee', 'efm_realise')
            ->withTimestamps();
    }

    public function formateurs() : BelongsToMany
    {
        return $this->belongsToMany(Formateur::class, 'groupe_formateur_module', 'code_groupe', 'code_formateur')
            ->withPivot('code_module', 'nbh_par_semaine_realisee', 'nbhp_realisee', 'nbhsync_realisee', 'nbh_total_realisee', 'nbcc_realisee', 'efm_realise')
            ->withTimestamps();
    }
}
