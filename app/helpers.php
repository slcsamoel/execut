<?php
use Carbon\Carbon;
/**
 *  verificar data inicio e data fim
 *
 */

 function verificarDataIncioDataFim ($dataInicio , $dataFim)
 {
    $data_inicio = Carbon::parse($dataInicio);
    $data_fim = Carbon::parse($dataFim);
    if ($data_inicio->lt($data_fim)) {
        return true;
    } else {
       return false;
    }
 }
