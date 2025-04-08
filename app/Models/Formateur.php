<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class Formateur extends Model
{
    /** @use HasFactory<\Database\Factories\FormateurFactory> */
    use HasFactory;

    protected $fillable = ['code_formateur','nom_formateur'];


    protected $primaryKey = "code_formateur";
    public $incrementing = false;
    protected $keyType = 'string';

    public function modules() : BelongsToMany
    {
        return $this->belongsToMany(Module::class, 'groupe_formateur_module', 'code_formateur', 'code_module')
            ->withPivot('code_groupe', 'code_filiere', 'nbh_par_semaine_realisee', 'nbhp_realisee', 'nbhsync_realisee', 'nbh_total_realisee', 'nbcc_realisee', 'efm_realise')
            ->withTimestamps();
    }

    public function groupes() : BelongsToMany
    {
        return $this->belongsToMany(Groupe::class, 'groupe_formateur_module', 'code_formateur', 'code_groupe')
            ->withPivot('code_module', 'code_filiere', 'nbh_par_semaine_realisee', 'nbhp_realisee', 'nbhsync_realisee', 'nbh_total_realisee', 'nbcc_realisee', 'efm_realise')
            ->withTimestamps();
    }

}
