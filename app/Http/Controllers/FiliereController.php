<?php

namespace App\Http\Controllers;

use App\Models\Filiere;
use App\Services\ExcelServices;
use Exception;
use Illuminate\Http\Request;

class FiliereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        try{
            $filieres = Filiere::latest()->get();
            $filieres_avancements = [];
            foreach($filieres as $filiere)
            {
                $filieres_avancements[] = calculerTauxMoyenFiliere($filiere);
            }
            $dataExtended = array_merge(...$filieres_avancements); 
    
            if($request->has('topthree') && $request->input('topthree') === "ok"){
                // array_slice()
    
                $topthree = array_slice(array_sorted($dataExtended,'taux_avancement',true),0,3);
                // dd($topthree);
                return response()->json($topthree,200);
            }
            // dd($filieres_avancements);
            return response()->json($dataExtended,200);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function totalNbrFilieres(){

        try{
            $nbrfilieres = count(Filiere::all()->toArray());
            // dd($nbrfilieres);
            return response()->json(['nbrfilieres' => $nbrfilieres],200);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
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
            return response()->json(['succeess' => 'success']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Filiere $filiere)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Filiere $filiere)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Filiere $filiere)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filiere $filiere)
    {
        //
    }
}
