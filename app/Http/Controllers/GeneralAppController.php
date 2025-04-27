<?php

namespace App\Http\Controllers;

use App\Models\Avancement;
use App\Models\Module;
use Illuminate\Http\Request;

class GeneralAppController extends Controller
{
    //
    public function calendrierEfms(Request $request)
    {
        // dd($request->route('regional'));
        if ($request->has('brief')) {
            $modules = Module::where('regional','O')
                ->get();
            // dd($modules);
            // $modules_codes = array_map(function($item){
            //     return $item['code_modules'];
            // },$modules->toArray());
            $calendrier_regional = [];
            foreach($modules as $module){
                $calendrier_regional[] = Avancement::select('code_filiere', 'code_module', 'date_efm_prevu')
                    ->where('code_module', $module['code_module'])
                    ->where('code_filiere', $module['code_filiere'])
                    ->where('date_efm_prevu','<>',null)
                    ->groupBy('code_filiere', 'code_module', 'date_efm_prevu')
                    ->orderBy('date_efm_prevu', 'desc')
                    ->first();
                // dd($calendrier_regional, $module);
            }
            $calendrier_regional_clean = array_filter($calendrier_regional, function ($item){
                return $item !== null;
            });
            // dd($calendrier_regional);

            // dd(count($modules->toArray()));
            return response()->json(['calendrierBref' => $calendrier_regional_clean],200);
            // dd($avancements);
        } else {
            $avancements = Avancement::paginate(10);
            dd($avancements);
            $calendrier = array_map(function ($item) {
                return [
                    "code_filiere" => $item['code_filiere'],
                    "code_groupe" => $item['code_groupe'],
                    "code_module" => $item['code_module'],
                    "date_efm_prevu" => $item['date_efm_prevu'],
                    "date_efm_reelle" => $item['date_efm_reelle'],
                ];
            }, $avancements->toArray());

            return response()->json(['calendrierEfms' => $calendrier],200);

        }
    }

    public function etatsModules() {
        $avancements = Avancement::all();

        $avancementsStats = array_map(function($item){
            $module = Module::where('code_module',$item['code_module'])
                ->where('code_filiere',$item['code_filiere'])
                ->first();
            // dd(gettype($item));
            // dd([
            //     'code_groupe' => $item['code_groupe'],
            //     'code_module' => $item['code_module'],
            //     'libelle_module' => $module['libelle_module'],
            //     'regional' => $module['regional'] === "O" ? "oui" : "non",
            //     'etat' => getModuleState($item, $module),
            // ]);
            return [
                'code_groupe' => $item['code_groupe'],
                'code_module' => $item['code_module'],
                'libelle_module' => $module['libelle_module'],
                'regional' => $module['regional'] === "O" ? "oui" : "non",
                'etat' => getModuleState($item, $module),
            ];
        },$avancements->toArray());

        // dd($avancementsStats);

        return response()->json(['modulesstats' => $avancementsStats],200);
    }
}
