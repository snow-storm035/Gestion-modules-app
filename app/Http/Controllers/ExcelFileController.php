<?php

namespace App\Http\Controllers;

use App\Models\Filiere;
use App\Models\Formateur;
use App\Models\Groupe;
use App\Models\Module;
use App\Services\ExcelServices;
use Exception;
use Illuminate\Http\Request;

class ExcelFileController extends Controller
{
    //

    public function extractAllData(Request $request)
    {
        // try{
            if($request->has('excelfile')){
                $jsonData = ExcelServices::convertExcelToJson($request);
        
                $data = json_decode($jsonData, true);
                // dd($data);
        
                $filieres = Filiere::first();
                $formateurs = Formateur::first();
                $groupes = Groupe::first();
                $modules = Module::first();
                // dd(!$filieres && !$formateurs && !$groupes && !$modules);
                // dd($filieres ,$formateurs ,$groupes ,$modules);

                if(!$filieres && !$formateurs && !$groupes && !$modules) //checking if there is data before running these functions
                {
                    getFilieres($data);
                    getFormateurs($data);
                    getGroupes($data);
                    getModules($data);
                }

                getAvancements($data);
            
                return response()->json(['success' => 'operation completed'],200);
            }
        // }catch(Exception $e){
        //     return response()->json(['error' => $e->getMessage()],500);
        // }
    }
}
