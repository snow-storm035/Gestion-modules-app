<?php

use App\Models\Avancement;
use App\Models\Filiere;
use App\Models\Module;

if (!function_exists('calculerTauxAvancement')) {
    function calculerTauxAvancement(Avancement $avancement)
    {
        // (mhtotal / mhrealisee) * 100 = tt %
        $module = Module::where('code_module', $avancement['code_module'])->first();

        return ($avancement['nbh_total_realisee'] / $module['nbh_total_global']) * 100;
    }
}
// masse horaire restante
if (!function_exists('mhrestante')) {
    function mhrestante(float $nbhrealise, float $nbhtotal)
    {
        // mhtotal - mhrealisee

        return $nbhrealise - $nbhtotal;
    }
}


if (!function_exists('calculerTauxMoyenFiliere')) {
    function calculerTauxMoyenFiliere(Filiere $filiere)
    {
        $groupes = $filiere->groupes()->get();
        // dd($groupes);
        $all = [];
        foreach ($groupes as $g) {
            $all[] = Avancement::where([
                ['code_filiere', '=', $filiere->code_filiere],
                ['code_groupe', '=', $g->code_groupe]
            ])->get();
            // dd($avancements);
            // foreach($avancements as $a){
            //     echo $a['code_module']."<br/>";
            // }
            // echo "*****************************************************************************";
            // $taux = array_map(function($item){
            //     return calculerTauxAvancement($item);
            // },[...$avancements]);
        }
        // dd($all);
        foreach ($all as $a) {
            $taux = array_map(function($item){
                return calculerTauxAvancement($item);
            },[...$a]);
            $moyenne = array_sum($taux) / count($taux);
            echo $moyenne."<br/>";
        }
        // dd("hi");

        dd($moyenne);
    }
}
