<?php

    


use Carbon\Carbon;

if(!function_exists('calculerDateFinModule')){
    
        function calculerDateFinModule($nb_heures_total,$nbhparsemaine,$dateDebut){
    
            $date_debut = Carbon::parse($dateDebut);
            if($nbhparsemaine > 0){
                $nbsemaines = $nb_heures_total / $nbhparsemaine;
                $dateFin = $date_debut->addWeeks($nbsemaines);
                return $dateFin;
            }
            return;
    
        }

}






?>