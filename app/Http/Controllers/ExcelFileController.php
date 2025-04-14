<?php

namespace App\Http\Controllers;

use App\Services\ExcelServices;
use Illuminate\Http\Request;

class ExcelFileController extends Controller
{
    //

    public function extractAllData(Request $request)
    {
        if($request->has('excelfile'))
        $jsonData = ExcelServices::convertExcelToJson($request->input('excelfile'));

        $data = json_decode($jsonData, true);


        getFilieres($data);
        getFormateurs($data);
        getGroupes($data);
        getModules($data);
        getAvancements($data);

    }
}
