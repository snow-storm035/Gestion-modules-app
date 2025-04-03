<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use App\Services\ExcelServices;
use Illuminate\Http\Request;

class FormateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    
            $formateurs_presentiel = array_map(function($item){
                if($item['code_formateur_p_actif'] && $item['formateur_p'] && $item){
                    return [
                        "code_formateur" => $item['code_formateur_p_actif'],
                        "nom_formateur" => $item['formateur_p']
                    ];
                }
            },$data);
            
            // dd(gettype($formateurs_presentiel));
    
            $formateurs_sync = array_map(function($item){
                if($item['code_formateur_sync_actif'] && $item['formateur_sync'] && $item){
                    return [
                        "code_formateur" => $item['code_formateur_sync_actif'],
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
                'code_formateur' => 'none',
                'nom_formateur' => 'none' 
            ]);

            foreach($formateurs_unique as $formateur){
                Formateur::firstOrCreate($formateur);
            }
        }
       




        return response()->json(["success" => "inserted successfully"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Formateur $formateur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Formateur $formateur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Formateur $formateur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formateur $formateur)
    {
        //
    }
}
