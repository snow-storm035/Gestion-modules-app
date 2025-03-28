<?php

namespace App\Http\Controllers;

use App\Models\Avancement;
use App\Models\Module;
use Illuminate\Http\Request;
use App\Services\ExcelServices;

class AvancementController extends Controller
{

    // public function calculerTauxAvancement(Request $request){

    //     $avancement = Avancement::where()->get();
    // }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $data = ExcelServices::convertExcelToJson($request);

        $avancements = Avancement::all();

        foreach($avancements as $a){
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
        if($request->has('excelfile')){
            $jsonData = ExcelServices::convertExcelToJson($request);
    
            
            $data = json_decode($jsonData, true);
    
    
            // dd($data);
    
            $avancements = array_map(function($item){
                return [
                    'code_module' => $item['code_module'],
                    'code_groupe' => $item['code_groupe'],
                    'code_formateur' => $item['code_formateur_p_actif'],
                    // 'code_formateur_sync' => $item['code_formateur_sync_actif'],

                    'nbhp_realisee' => $item['nbh_realisee_p'],
                    'nbhsync_realisee' => $item['nbh_realisee_sync'],
                    'nbh_total_realisee' => $item['nbh_realisee_global'],

                    'nbcc_realisee' => $item['nbcc'],
                    'efm_realise' => $item['validation_efm']
                    // 'nbh_total_realisee' => $item['nbh_realisee_global'],

                ];
            },$data);

            $avancements_unique = array_unique($avancements, SORT_REGULAR);

            

            // dd($avancements_unique);


            foreach($avancements_unique as $avancement){
                Avancement::create($avancement);
            }

            return response(200)->json(['success' => 'avancement updated successfully']);
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
