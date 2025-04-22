<?php
    if(!function_exists('convertStringToDate'))
    {
        function convertStringToDate(string $dateString)
        {
            $date = new DateTime($dateString);
            return $date->format('Y-m-d');
        }
    }



?>