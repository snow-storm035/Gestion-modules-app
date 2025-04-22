<?php
    use Carbon\Carbon;
    use App\Models\Alert;
use App\Models\Avancement;

    if(!function_exists('moduleEnRetard'))
    {
        // function moduleEnRetard(float $mhrestante, float $nbhparsemaine, Carbon $dateEfmPrevu)
        function moduleEnRetard(float $mhrestante, Avancement $avancement)
        {
            $nbrSemaines = ceil($mhrestante / $avancement['nbhparsemaine']);
            $dateFinPrevu = Carbon::now()->addWeeks($nbrSemaines);
            if($avancement['dateEfmPrevu'] < $dateFinPrevu){
                // Alert::create([
                //     "code_module" => $avancement['code_module'],
                //     "code_groupe" => $avancement['code_groupe'],
                //     "matricule" => $avancement['matricule'],
                //     "etat" => "en retard",
                //     "mhrestante" => $mhrestante ,
                // ]);
                return true;
            }
            return false;
        }
    }
    if(!function_exists('modulePresqueFinis'))
    {
        function modulePresqueFinis(float $mhrestante, Avancement $avancement)
        {
            if($avancement['nbh_total_realisee'] > 90){
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


    if(!function_exists('verifierAvancements')){
        function verifierAvancements()
        {
            $avancements = Avancement::all();
            foreach($avancements as $a){
                
            }
        }
    }
?>