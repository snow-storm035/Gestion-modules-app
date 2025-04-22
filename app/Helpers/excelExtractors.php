<?php

use App\Models\Filiere;
use App\Models\Formateur;
use App\Models\Groupe;
use App\Models\Module;
use App\Models\Avancement;
use Carbon\Carbon;
use PhpParser\PrettyPrinter;

use function PHPUnit\Framework\isString;

if (!function_exists('getFilieres')) {
    function getFilieres($data)
    {
        $filieres = array_map(function ($item) {
            return [
                'code_filiere' => $item['code_filiere'],
                'nom_filiere' => $item['filiere'],
                'type_formation' => $item['type_formation'],
                'secteur' => $item['secteur']
            ];
        }, $data);

        $filieres_unique = array_unique($filieres, SORT_REGULAR);

        // dd($filieres_unique);

        foreach ($filieres_unique as $filiere) {
            Filiere::firstOrCreate($filiere);
        }
    }
}


if (!function_exists('getFormateurs')) {
    function getFormateurs($data)
    {
        $formateurs_presentiel = array_map(function ($item) {
            if ($item['code_formateur_p_actif'] && $item['formateur_p'] && $item) {
                return [
                    "matricule" => $item['code_formateur_p_actif'],
                    "nom_formateur" => $item['formateur_p']
                ];
            }
        }, $data);

        // dd(gettype($formateurs_presentiel));

        $formateurs_sync = array_map(function ($item) {
            if ($item['code_formateur_sync_actif'] && $item['formateur_sync'] && $item) {
                return [
                    "matricule" => $item['code_formateur_sync_actif'],
                    "nom_formateur" => $item['formateur_sync']
                ];
            }
        }, $data);

        $fp_notnull =  array_filter($formateurs_presentiel, function ($item) {
            return $item !== null;
        });
        $fsync_notnull =  array_filter($formateurs_sync, function ($item) {
            return $item !== null;
        });

        $formateurs = array_merge($fp_notnull, $fsync_notnull);

        $formateurs_unique = array_unique($formateurs, SORT_REGULAR);
        // dd($formateurs_unique);

        Formateur::firstOrCreate([
            'matricule' => 'none',
            'nom_formateur' => 'none'
        ]);

        foreach ($formateurs_unique as $formateur) {
            Formateur::firstOrCreate($formateur);
        }
    }
}



if (!function_exists('getGroupes')) {
    function getGroupes($data)
    {

        $groupes = array_map(function ($item) {
            return [
                'code_filiere' => $item['code_filiere'],
                'code_groupe' => $item['code_groupe'],
                'niveau' => $item['niveau'],
                'effectif' => $item['effectif_groupe'],
                'annee_formation' => $item['annee_formation'],
                'status_groupe' => $item['status_sousgroupe'],
                'mode' => $item['mode'],
                'creneau' => $item['creneau']
            ];
        }, $data);

        $groupes_unique = array_unique($groupes, SORT_REGULAR);

        foreach ($groupes_unique as $groupe) {
            Groupe::firstOrCreate($groupe);
        }
    }
}

if (!function_exists('getModules')) {
    function getModules($data)
    {
        $modules = array_map(function ($item) {
            return [
                'code_filiere' => $item['code_filiere'],
                'code_module' => $item['code_module'],
                'libelle_module' => $item['module'],
                'regional' => $item['regional'],

                'nbh_p_s1' => (float) $item['nbh_p_s1'],
                'nbh_sync_s1' => (float) $item['nbh_sync_s1'],
                'nbh_async_s1' => (float) $item['nbh_async_s1'],
                'nbh_total_s1' => (float) $item['nbh_total_s1'],

                'nbh_p_s2' => (float) $item['nbh_p_s2'],
                'nbh_sync_s2' => (float) $item['nbh_sync_s2'],
                'nbh_async_s2' => (float) $item['nbh_async_s2'],
                'nbh_total_s2' => (float) $item['nbh_total_s2'],

                'nbh_p_total' => (float) $item['nbh_p_total'],
                'nbh_sync_total' => (float) $item['nbh_sync_total'],
                'nbh_async_total' => (float) $item['nbh_async_total'],
                'nbh_total_global' => (float) $item['nbh_total_global'],
            ];
        }, $data);

        $modules_unique = array_unique($modules, SORT_REGULAR);

        foreach ($modules_unique as $module) {
            Module::firstOrCreate($module);
        }
    }
}


if (!function_exists('getAvancements')) {
    function getAvancements($data)
    {
        $avancements = array_map(function ($item) {
            // dd($item);
            $correspondant = Avancement::findWithCompositeKey([
                ['matricule', '=', $item['code_formateur_p_actif']],
                ['code_groupe', '=', $item['code_groupe']],
                // ['code_filiere','=',$item['code_filiere']],
                ['code_module', '=', $item['code_module']]
            ]);

            // dd($correspondant);

            if ($correspondant) {

                if ($item['nbh_realisee_global'] > 0 && $correspondant['debut_module'] === null) {
                    $date_debut = Carbon::now()->toDateString();
                    // dd($item['date_debut'],$item);
                }

                $module = Module::where([
                    ['code_module', '=', $correspondant['code_module']],
                    ['code_filiere', '=', $correspondant['code_filiere']]
                ])->first();

                // dd($module);
                if ($module) {
                    $total = $module['nbh_p_total'] + $module['nbh_sync_total'];
                }

                // dd($total);
                // dd(isModuleHoursCompleted($correspondant['nbh_total_realisee'], $total ));

                //verify if a groupe has completed the module's HOURS and that we have a start date('date_debut'):
                    // dd($correspondant['fin_module']);
                    // dd((string) null);
                if (!isModuleHoursCompleted($correspondant['nbh_total_realisee'], $total) && $correspondant['debut_module'] !== null && $correspondant['fin_module'] === null) {
                    $nbh_par_semaine_p = $correspondant['nbhp_realisee'] - $item['nbh_realisee_p'];
                    $nbh_par_semaine_sync = $correspondant['nbhsync_realisee'] - $item['nbh_realisee_sync'];
                    $nbh_par_semaine_total = $correspondant['nbh_total_realisee'] - $item['nbh_realisee_global'];

                    // calculer la date fin prévu :
                    $dateFin = calculerDateFinModule($total, $nbh_par_semaine_total, $correspondant['debut_module']);
                    // dd($nbh_par_semaine,$correspondant);
                    // dd($dateFin->toDateString());
                }

                // else{
                //     dd('did not enter if condition');
                // }
            }
            // dd($correspondant);
            // $prec_nbh_par_semaine = $correspondant ? $correspondant['nbh_par_semaine'] : 0;
            $prec_nbhp_realisee = $correspondant ? $correspondant['nbhp_realisee'] : 0;
            $prec_nbhsync_realisee = $correspondant ? $correspondant['nbhsync_realisee'] : 0;
            $prec_nbh_total_realisee = $correspondant ? $correspondant['nbh_total_realisee'] : 0;

            // dd($prec_nbh_par_semaine,$prec_nbh_total_realisee,$prec_nbhp_realisee,$prec_nbhsync_realisee);

            return [
                'code_module' => $item['code_module'],
                'code_filiere' => $item['code_filiere'],
                'code_groupe' => $item['code_groupe'],
                'matricule' => $item['code_formateur_p_actif'] !== "" ? $item['code_formateur_p_actif'] : "none",
                // 'matricule' => $item['code_formateur_p_actif'] ? $item['code_formateur_p_actif'] : "none" ,
                // 'code_formateur_sync' => $item['code_formateur_sync_actif'],

                'nbhp_realisee' => (float) $item['nbh_realisee_p'],
                'nbhsync_realisee' => (float) $item['nbh_realisee_sync'],
                'nbh_total_realisee' => (float) $item['nbh_realisee_global'],

                'prec_nbhp_realisee' => (float)  $prec_nbhp_realisee,
                'prec_nbhsync_realisee' => (float)  $prec_nbhsync_realisee,
                'prec_nbh_total_realisee' => (float) $prec_nbh_total_realisee,

                // maybe should reset to 0 :
                'nbh_par_semaine_p' => isset($nbh_par_semaine_p) ? $nbh_par_semaine_p : 0,
                'nbh_par_semaine_sync' => isset($nbh_par_semaine_sync) ? $nbh_par_semaine_sync : 0,
                'nbh_par_semaine_total' => isset($nbh_par_semaine_total) ? $nbh_par_semaine_total : 0,

                'nbcc_realisee' => (int) $item['nbcc'],

                'efm_realise' => (string) $item['validation_efm'],

                'debut_module' => isset($date_debut) ? (string) $date_debut : "2020-10-10",

                // 'fin_module' => "2020-05-05"
                'fin_module' => isset($dateFin) ? (string) $dateFin->toDateString() : "2020-10-10"
            ];

            // echo print_r($correspondant['nbh_par_semaine']);
        }, $data);

        // dd($avancements);
        $avancements_unique = array_unique($avancements, SORT_REGULAR);
        // dd($avancements_unique);
        // $avancements_unique = collect($avancements)
        //     ->unique(function ($item) {
        //         return $item['code_module'] . '_' . $item['code_groupe'] . '_' . $item['matricule'];
        //     })
        //     ->values()
        //     ->all();

        foreach ($avancements_unique as $a) {
            foreach ($a as $key => $val) {
                if (!is_string($key)) {
                    echo var_dump($key) . "<br/>";
                }
            }
            // echo "<pre>".print_r(array_keys($a))."</pre>";
        }
        // dd($avancements_unique);
        try {
            $i = 0;
            foreach ($avancements_unique as $avancement) {
                // $fillableColumns = (new \App\Models\Avancement)->getFillable();
                // dd(array_diff(array_keys($avancement), $fillableColumns));
                // dd($avancement);
                // dd(array_keys($avancement));
                foreach ($avancement as $key => $value) {
                    if (is_array($value) || is_object($value)) {
                        dd("Invalid value detected", $key, $value);
                    }
                }
                $clean_avancement = collect($avancement)
                    ->map(function ($val) {
                        if (is_object($val)) return (string) $val; // e.g. Carbon objects
                        if (is_array($val)) return json_encode($val); // or maybe skip it
                        return $val;
                    })
                    ->toArray();

                if ($clean_avancement !== null) {
                    // Avancement::firstOrCreate($avancement);
                    $i++;
                    // echo $i . "<br/>";
                    // echo "<pre>";
                    // echo print_r($avancement) . "<br/>";
                    // echo "</pre>";
                    // Avancement::updateOrCreate([
                    //     ['code_module', '=', $clean_avancement['code_module']],
                    //     ['code_groupe', '=', $clean_avancement['code_groupe']],
                    //     ['matricule', '=', $clean_avancement['matricule']]
                    // ], $clean_avancement);

                    $target = Avancement::findWithCompositeKey([
                            ['code_module', '=', $avancement['code_module']],
                            ['code_groupe', '=', $avancement['code_groupe']],
                            ['matricule', '=', $avancement['matricule']]
                    ]);

                    // dd($target);

                    // $target->nbhp_realisee = $clean_avancement['nbhp_realisee'];
                    // $target->fill($clean_avancement);

                    // dd(gettype(Carbon::parse($avancement['debut_module'])));
                    // dd(gettype($clean_avancement['debut_module']), $clean_avancement['debut_module']);


                    // dd(array_keys($clean_avancement), array_map(function ($item){
                    //     return is_string($item);
                    // },array_keys($clean_avancement)));
                    // $target->nbhp_realisee = $clean_avancement['nbhp_realisee'];
                    // dd('error here');
                    // $target->nbhsync_realisee = $clean_avancement['nbhsync_realisee'];
                    // $target->nbh_total_realisee = $clean_avancement['nbh_total_realisee'];
                    // dd($clean_avancement['prec_nbhp_realisee'],gettype($clean_avancement['prec_nbhp_realisee']));
                    // dd($clean_avancement['nbhp_realisee'],gettype($clean_avancement['nbhp_realisee']));
                    
                    $target->prec_nbhp_realisee = $clean_avancement['prec_nbhp_realisee'];
                    // $target->prec_nbhsync_realisee = $clean_avancement['prec_nbhsync_realisee'];
                    // $target->prec_nbh_total_realisee = $clean_avancement['prec_nbh_total_realisee'];

                    // $target->nbh_par_semaine_p = $clean_avancement['nbh_par_semaine_p'];
                    // $target->nbh_par_semaine_sync = $clean_avancement['nbh_par_semaine_sync'];
                    // $target->nbh_par_semaine_total = $clean_avancement['nbh_par_semaine_total'];
                    // $target->nbcc_realisee = $clean_avancement['nbcc_realisee'];
                    // $target->efm_realise = $clean_avancement['efm_realise'];

                    // $target->debut_module = $clean_avancement['debut_module'];
                    // $target->fin_module = $clean_avancement['fin_module'];

                    // $target->debut_module = Carbon::parse($avancement['debut_module']);

                    // $target->debut_module = Carbon::createFromFormat('Y-m-d', $avancement['debut_module']);

                    // $target->fin_module = "2020-10-10";

                    $target->save();
                    
                    // dd($avancement);
                    // break;
                    // dd('update passed');
                }
            }
        } catch (Exception $e) {
            throw new Error("error here $i");
            // return response()->json(['error here' => $i]);
            // dd($avancement);
        }
    }
}
