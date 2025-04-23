<?php

use Carbon\Carbon;
use App\Models\Alert;
use App\Models\Avancement;
use App\Models\User;
use App\Notifications\ModuleEnRetard;
use App\Notifications\ModulePrequeFini;

if (!function_exists('moduleEnRetard')) {
    // function moduleEnRetard(float $mhrestante, float $nbhparsemaine, Carbon $dateEfmPrevu)
    function moduleEnRetard(float $mhrestante, Avancement $avancement)
    {
        if($avancement['nbhparsemaine'] != 0){
            $nbrSemaines = ceil($mhrestante / $avancement['nbhparsemaine']);
            $dateFinPrevu = Carbon::now()->addWeeks($nbrSemaines);
            if ($avancement['dateEfmPrevu'] < $dateFinPrevu) {
                // Alert::create([
                //     "code_module" => $avancement['code_module'],
                //     "code_groupe" => $avancement['code_groupe'],
                //     "matricule" => $avancement['matricule'],
                //     "etat" => "en retard",
                //     "mhrestante" => $mhrestante ,
                // ]);
                return true;
            }
        }
        return false;
    }
}
if (!function_exists('modulePresqueFinis')) {
    function modulePresqueFinis(float $mhrestante, Avancement $avancement)
    {
        // dd(calculerTauxAvancement($avancement));
        if (calculerTauxAvancement($avancement) > 90 && strtolower($avancement['efm_realise']) === "non") {
            return true;
            // Alert::create([
            //     "code_module" => $avancement['code_module'],
            //     "code_groupe" => $avancement['code_groupe'],
            //     "matricule" => $avancement['matricule'],
            //     "etat" => "en retard",
            //     "mhrestante" => $mhrestante ,
            // ]);
        }
        return false;
    }
}
if (!function_exists('verifierAvancements')) {
    function verifierAvancements()
    {
        $avancements = Avancement::all();
        foreach ($avancements as $avancement) {
            $mhrestante = mhrestante($avancement);
            // dd($avancement);
            if (moduleEnRetard($mhrestante, $avancement)) {
                Alert::create([
                    "avancement_id" => $avancement['id'],
                    "code_module" => $avancement['code_module'],
                    "code_groupe" => $avancement['code_groupe'],
                    "matricule" => $avancement['matricule'],
                    "etat" => "en retard",
                    "mhrestante" => $mhrestante,
                ]);
                $user = User::find(1);
                $user->notify(new ModuleEnRetard($avancement));
            } else if (modulePresqueFinis($mhrestante, $avancement)) {
                Alert::create([
                    "avancement_id" => $avancement['id'],
                    "code_module" => $avancement['code_module'],
                    "code_groupe" => $avancement['code_groupe'],
                    "matricule" => $avancement['matricule'],
                    "etat" => "en presque fini",
                    "mhrestante" => $mhrestante,
                ]);
                $user = User::find(1);
                // dd($user);
                $user->notify(new ModulePrequeFini($avancement));
            }else {
                continue; 
            }
        }
    }
}
