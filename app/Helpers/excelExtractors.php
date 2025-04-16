<?php
use App\Models\Filiere;
use App\Models\Formateur;
use App\Models\Groupe;
use App\Models\Module;
use App\Models\Avancement;
use Carbon\Carbon;

    if(!function_exists('getFilieres'))
    {
        function getFilieres($data){
            $filieres = array_map(function($item){
                return [
                    'code_filiere' => $item['code_filiere'],
                    'nom_filiere' => $item['filiere'],
                    'type_formation' => $item['type_formation'],
                    'secteur' => $item['secteur']
                ];
            },$data);

            $filieres_unique = array_unique($filieres, SORT_REGULAR);

            // dd($filieres_unique);

            foreach($filieres_unique as $filiere){
                Filiere::create($filiere);
            }
        }
    }


    if(!function_exists('getFormateurs'))
    {
        function getFormateurs($data)
        {

            $formateurs_presentiel = array_map(function($item){
                if($item['code_formateur_p_actif'] && $item['formateur_p'] && $item){
                    return [
                        "matricule" => $item['code_formateur_p_actif'],
                        "nom_formateur" => $item['formateur_p']
                    ];
                }
            },$data);
            
            // dd(gettype($formateurs_presentiel));
    
            $formateurs_sync = array_map(function($item){
                if($item['code_formateur_sync_actif'] && $item['formateur_sync'] && $item){
                    return [
                        "matricule" => $item['code_formateur_sync_actif'],
                        "nom_formateur" => $item['formateur_sync']
                    ];
                }
            },$data);
    
            $fp_notnull =  array_filter($formateurs_presentiel, function($item){
                return $item !== null;
            });
            $fsync_notnull =  array_filter($formateurs_sync, function($item){
                return $item !== null;
            });
    
            $formateurs = array_merge($fp_notnull, $fsync_notnull);
    
            $formateurs_unique = array_unique($formateurs, SORT_REGULAR);
            // dd($formateurs_unique);
            
            Formateur::firstOrCreate([
                'matricule' => 'none',
                'nom_formateur' => 'none' 
            ]);
    
            foreach($formateurs_unique as $formateur){
                Formateur::firstOrCreate($formateur);
            }
        }
    }



    if(!function_exists('getGroupes'))
    {
        function getGroupes($data){

            $groupes = array_map(function($item){
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
            },$data);
    
            $groupes_unique = array_unique($groupes, SORT_REGULAR);
    
            foreach($groupes_unique as $groupe){
                Groupe::create($groupe);
            }
        }
    }

    if(!function_exists('getModules'))
    {
        function getModules($data)
        {
            $modules = array_map(function($item){
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
            },$data);

            $modules_unique = array_unique($modules, SORT_REGULAR);

            foreach($modules_unique as $module){
                Module::create($module);
            }
        }
    }


    if(!function_exists('getAvancements'))
    {
        function getAvancements($data)
        {
            $avancements = array_map(function ($item) {

                $correspondant = Avancement::findWithCompositeKey([
                    ['matricule','=',$item['code_formateur_p_actif']],
                    ['code_groupe','=',$item['code_groupe']],
                    // ['code_filiere','=',$item['code_filiere']],
                    ['code_module','=',$item['code_module']]
                ]);

                // dd($correspondant);
                
                if($correspondant){

                    if($item['nbh_realisee_global'] > 0 && $correspondant['debut_module'] === null){
                        $date_debut = Carbon::now()->toDateString();
                        // dd($item['date_debut'],$item);
                    }

                    $module = Module::where([
                        ['code_module','=',$correspondant['code_module']],
                        ['code_filiere','=',$correspondant['code_filiere']]
                    ])->first();
                    
                    // dd($module);
                    if($module){
                        $total = $module['nbh_p_total'] + $module['nbh_sync_total'];
                    }

                    // dd($total);
                    // dd(isModuleHoursCompleted($correspondant['nbh_total_realisee'], $total ));

                    //verify if a groupe has completed the module's HOURS and that we have a start date('date_debut'):
                    if(!isModuleHoursCompleted($correspondant['nbh_total_realisee'], $total ) && $correspondant['debut_module'] !== null){ 
                        $nbh_par_semaine = $correspondant['nbhp_realisee'] - $item['nbh_realisee_p'];

                        // calculer la date fin prévu :
                        $dateFin = calculerDateFinModule($total,$nbh_par_semaine,$correspondant['debut_module']);
                        // dd($nbh_par_semaine,$correspondant);
                        dd($dateFin->toDateString());
                    }
                    // else{
                    //     dd('did not enter if condition');
                    // }
                }
                // dd($correspondant['nbh_par_semaine']);

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

                    // maybe should reset to 0 :
                    'nbh_par_semaine' => isset($nbh_par_semaine) ? $nbh_par_semaine : ($correspondant ? $correspondant['nbh_par_semaine'] : 0),

                    'nbcc_realisee' => (int) $item['nbcc'],

                    'efm_realise' => $item['validation_efm'],

                    'debut_module' => isset($date_debut) ? $date_debut : null,

                    'fin_module' => isset($dateFin) ? $dateFin->toDateString() : null
                ];

                // echo print_r($correspondant['nbh_par_semaine']);
            }, $data);
            
            // dd($avancements);
            $avancements_unique = array_unique($avancements, SORT_REGULAR);

            // dd($avancements_unique);

            foreach ($avancements_unique as $avancement) {
                if($avancement !== null){
                    // Avancement::firstOrCreate($avancement);
                    Avancement::updateOrCreate([
                        ['code_module', '=', $avancement['code_module']],
                        ['code_groupe', '=', $avancement['code_groupe']],
                        ['matricule', '=', $avancement['matricule']],
                        ['code_filiere', '=', $avancement['code_filiere']]
                    ],$avancement);
                    // dd('error rise here');
                }
            }
        }
    }

?>