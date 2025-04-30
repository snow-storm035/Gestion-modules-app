<?php

use Carbon\Carbon;
use App\Models\Alert;
use App\Models\Avancement;
use App\Models\User;
use App\Notifications\ModuleEnRetard;
use App\Notifications\ModulePrequeFini;

if (!function_exists('moduleEnRetard')) {
    // function moduleEnRetard(float $mhrestante, float $nbhparsemaine, Carbon $dateEfmPrevu)
    function moduleEnRetard(float $mhrestante, Avancement $avancement, float $new_nbhparsemaine = 0)
    {
        // in case of update we might want to check before updating
        // dd($avancement);
        $main_nbhparsemaine = $new_nbhparsemaine != 0 ? $new_nbhparsemaine : $avancement['nbh_par_semaine_total'];
        // dd($main_nbhparsemaine);
        if($main_nbhparsemaine != 0){
            $nbrSemaines = ceil($mhrestante / $main_nbhparsemaine);
            // dd($nbrSemaines);
            $dateFinPrevu = Carbon::now()->addWeeks($nbrSemaines);
            $dates_gape = $dateFinPrevu->diffInDays(Carbon::parse($avancement['date_efm_prevu'])); // -> dateefm - datefinprevu > 0
            // dd($dates_gape,$dateFinPrevu->toDateString());
            // dd($dateFinPrevu->toDateString(),$avancement['dateEfmPrevu']);
            dd('hi?');
            if ($dates_gape < 0) {
                // dd("inside",($dates_gape < 0));
                // Alert::create([
                //     "code_module" => $avancement['code_module'],
                //     "code_groupe" => $avancement['code_groupe'],
                //     "matricule" => $avancement['matricule'],
                //     "etat" => "en retard",
                //     "mhrestante" => $mhrestante ,
                // ]);
                return $dateFinPrevu; // càd en retard
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
            // dd('hi?46');
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
                    "code_filiere" => $avancement['code_filiere'],
                    "code_module" => $avancement['code_module'],
                    "code_groupe" => $avancement['code_groupe'],
                    "etat" => "en retard",
                    "mhrestante" => $mhrestante,
                    "date_fin_prevu" => moduleEnRetard($mhrestante, $avancement) // this either will get a 0 or certain date
                ]);
                $user = User::find(1);
                $user->notify(new ModuleEnRetard($avancement));
            } else if (modulePresqueFinis($mhrestante, $avancement)) {
                Alert::create([
                    "avancement_id" => $avancement['id'],
                    "code_filiere" => $avancement['code_filiere'],
                    "code_module" => $avancement['code_module'],
                    "code_groupe" => $avancement['code_groupe'],
                    // "matricule" => $avancement['matricule'],
                    "date_fin_prevu" => $avancement['fin_module'],
                    "etat" => "presque fini",
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
