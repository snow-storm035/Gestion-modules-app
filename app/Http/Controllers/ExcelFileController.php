<?php

namespace App\Http\Controllers;

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
        
                getFilieres($data);
                getFormateurs($data);
                getGroupes($data);
                getModules($data);
                getAvancements($data);
            
                return response()->json(['success' => 'operation completed'],200);
            }
        // }catch(Exception $e){
        //     return response()->json(['error' => $e->getMessage()],500);
        // }
    }
}
