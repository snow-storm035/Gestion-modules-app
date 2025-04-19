<?php

    if(!function_exists('calculerTauxAvancement'))
    {
        function calculerTauxAvancement(float $nbhrealise, float $nbhtotal)
        {
            // (mhtotal / mhrealisee) * 100 = tt %

            return ($nbhrealise / $nbhtotal) * 100;
        }
    }


    // masse horaire restante

    if(!function_exists('mhrestante')){

        function mhrestante(float $nbhrealise, float $nbhtotal){

            // mhtotal - mhrealisee

            return $nbhrealise - $nbhtotal;
        }


    }





?>