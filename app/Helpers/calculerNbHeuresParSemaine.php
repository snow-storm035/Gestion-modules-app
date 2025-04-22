<?php
    use Carbon\Carbon;
    if(!function_exists('calcluerNbHeuresParSemaine')){
        function calcluerNbHeuresParSemaine(float $prev, float $next){
            return $next - $prev;
        }
    }
    if(!function_exists('proposerNbHeuresParSemaines')){
        function proposerNbHeuresParSemaines(Carbon $dateEfm, float $mhrestante)
        {
            $nbrSemaines = Carbon::now()->diffInWeeks($dateEfm);
            return ceil($mhrestante / $nbrSemaines ) + 2; // majoration de 2h plus      
        }
    }
?>