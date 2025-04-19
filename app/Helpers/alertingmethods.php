<?php

    use Carbon\Carbon;
    if(!function_exists('moduleEnRetard'))
    {
        function moduleEnRetard(float $mhrestante, float $nbhparsemaine, Carbon $dateEfmPrevu)
        {
            $nbrSemaines = ceil($mhrestante / $nbhparsemaine);
            $dateFinPrevu = Carbon::now()->addWeeks($nbrSemaines);

            if($dateEfmPrevu < $dateFinPrevu){
                return "en retard";
            }
            return false;
        }
    }
    if(!function_exists('modulePresqueFinis'))
    {
        function modulePresqueFinis(float $tauxAvancementTotal)
        {
            if($tauxAvancementTotal > 90){
                return "module presque finis";
            }

            return false;
        }
    }
?>