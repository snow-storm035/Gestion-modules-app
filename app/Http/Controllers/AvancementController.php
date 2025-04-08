<?php

namespace App\Http\Controllers;

use App\Models\Avancement;
use App\Models\Module;
use Illuminate\Http\Request;
use App\Services\ExcelServices;
use Carbon\Carbon;
use Mockery\Undefined;

class AvancementController extends Controller
{

    public function makeAlert() {

        // display an alert
        // good : if the nbh/sem is sufficient
        //    --> this means : between start and end dates the number of hours after this period will
            // reach the total amount in the end 
        // bad : if not


        $modules = Module::all();
        // $modules = Module::orderBy('debut_module')->get();

        $modules_stats = [];
        foreach($modules as $m){

            if($m['debut_module'] !== null){

                // dd($m['code_module'], $m['code_filiere']);

                $dateDebut = Carbon::parse($m['debut_module']);
    
                $dateEfm = Carbon::parse($m['date_efm_normal']);

                // différence entre les dates en semaines :
                $nbsemaines = floor($dateDebut->diffInWeeks($dateEfm));

                // $module = array_map(function($groupe) use($m){
                //     $a = [...$groupe['pivot']];
                //     // dd($a);
                //     // dd($groupe);
                //     if($groupe['pivot']['code_filiere'] === $m['code_filiere'] && $groupe['pivot']['code_module'] === $m['code_module']){
                //         return [
                //             'code_filiere' => $a['code_filiere'],
                //             'code_module' => $a['code_module'],
                //             'nbh_par_semaine' => $a['nbh_par_semaine_realisee']
                //         ];
                //     }
                // },$m->groupes->where('code_filiere',$m['code_filiere'])->toArray());

                $module = $m->groupes->where('code_filiere',$m['code_filiere'])
                ->firstOrFail() // this will raise a NOT FOUND ERROR !!!
                ->toArray()['pivot'];

                // dd($m->groupes->where('code_filiere',$m['code_filiere'])->first()->toArray()['pivot']);
                $taux_total = $module['nbh_par_semaine_realisee'] * $nbsemaines;
                
                // dd($taux_total, $m['nbh_p_total'] + $m['nbh_sync_total'], $m['nbh_total_global']);
                if($taux_total >= $m['nbh_p_total'] + $m['nbh_sync_total']){
                    $module['willcompleteontime'] = true;
                }else{
                    $module['willcompleteontime'] = false;
                }

                $modules_stats[] = $module;
                
                // dd(gettype($module), $module);
                // dd(gettype($dateDebut),gettype($dateEfm),$dateDebut, $diffWeeks, gettype($diffWeeks));
                
            }
            
        }
        dd($modules_stats);

    }



    public function changerNbHeuresParSemaine(Request $request)
    {

        // dd($request['avancement']['code_module']);

        $codeModule = $request['avancement']['code_module'];
        $codeGroupe = $request['avancement']['code_groupe'];
        $codeFormateur = $request['avancement']['matricule'];

        // dd($codeModule, $codeGroupe, $codeFormateur);

        // $avancement = $request->has('avancement') ?
        //     Avancement::findWithCompositeKey([
        //         ['code_module','=',$codeModule],
        //         ['code_groupe','=',$codeGroupe],
        //         ['matricule','=',$codeFormateur]
        //     ])
        //     : null;

        $avancement = $request->has('avancement') ?
            Avancement::where('code_module', $codeModule)
            ->where('code_groupe', $codeGroupe)
            ->where('matricule', $codeFormateur)
            ->first()
            : null;

        // dd($avancement);



        if ($request->has('nbh_par_semaine') && $avancement) {
            Avancement::updateWithCompositeKey([
                ['code_module','=',$codeModule],
                ['code_groupe','=',$codeGroupe],
                ['matricule','=',$codeFormateur],
            ],['nbh_par_semaine_realisee' => $request['nbh_par_semaine']]);
            // $avancement->update([
            //     'nbh_par_semaine_realisee' => $request['nbh_par_semaine']
            // ]);


            // $avancement['nbh_par_semaine_realisee'] = $request['nbh_par_semaine'];

            // $avancement->save();

            $avancement = Avancement::where('code_module', $codeModule)
            ->where('code_groupe', $codeGroupe)
            ->where('matricule', $codeFormateur)
            ->first();


            dd($avancement['nbh_par_semaine_realisee']);


            return response()->json(['success' => 'data has been updated successfully'],200);
        } else {
            return response()->json(['error' => 'all fields are required'],400);
        }
    }

    public function calculerTauxAvancement(Request $request)
    {

        $avancements = Avancement::all();

        // $a = Module::firstOrFail();
        // dd($a['nbh_p_total']);

        // dd($avancements);
        // foreach($avancements as $avancement){
        //     dd($avancement['code_module']);
        // }

        $taux_realisation = array_map(function ($item) {

            $module = Module::where('code_module', $item['code_module'])->firstOrFail();
            // $module = $item->module;
            // dd($module['nbh_p_total']);


            return [

                'code_module' => $item['code_module'],
                'matricule' => $item['matricule'],
                'code_groupe' => $item['code_groupe'],
                'total_realise' => $item['nbh_total_realisee'],
                'total_heures' => $module['nbh_total_global'],
                'taux_presentiel_realise' => $module['nbh_p_total']  != 0 ? ($item['nbhp_realisee'] / $module['nbh_p_total']) * 100 : 0,
                'taux_sync_realise' => $module['nbh_sync_total'] != 0 ? ($item['nbhsync_realisee'] / $module['nbh_sync_total']) * 100 : 0,
                'taux_total_realise' => $module['nbh_total_global'] != 0 ? ($item['nbh_total_realisee'] / ($module['nbh_p_total'] + $module['nbh_sync_total'])) * 100 : 0,

            ];
        }, [...$avancements]);

        dd($taux_realisation);
    }




    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $data = ExcelServices::convertExcelToJson($request);

        $avancements = Avancement::all();

        foreach ($avancements as $a) {
            dd($a->modules);
        }



        return response()->json(json_decode($avancements));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        if ($request->has('excelfile')) {
            $jsonData = ExcelServices::convertExcelToJson($request);

            $data = json_decode($jsonData, true);

            // dd($data);

            $avancements = array_map(function ($item) {
                $correspondant = Avancement::findWithCompositeKey([
                    ['matricule','=',$item['code_formateur_p_actif']],
                    ['code_groupe','=',$item['code_groupe']],
                    ['code_module','=',$item['code_module']]
                ]);

                dd($correspondant);
                if($item['nbh_realisee_global'] > 0 && ''){}

                $nbh_par_semaine = 2.5;
                // $dateFin = calculerDateFinModule(,,);

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

                    'nbcc_realisee' => (int) $item['nbcc'],
                    'efm_realise' => $item['validation_efm']
                    // 'nbh_total_realisee' => $item['nbh_realisee_global'],

                ];
            }, $data);

            $avancements_unique = array_unique($avancements, SORT_REGULAR);

            // dd($avancements_unique);

            foreach ($avancements_unique as $avancement) {
                Avancement::firstOrCreate($avancement);
            }

            return response()->json(['success' => 'avancement updated successfully']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Avancement $avancement)
    {
        //
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Avancement $avancement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Avancement $avancement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avancement $avancement)
    {
        //
    }
}
