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


function calcularDiferencaDias($dataInicial, $dataFinal = null)
{
    // Converte a data inicial em um objeto Carbon
    $dataInicial = Carbon::parse($dataInicial);

    // Se a data final não for informada, usa a data atual
    $dataFinal = $dataFinal ? Carbon::parse($dataFinal) : Carbon::now();

    // Calcula a diferença em dias entre as duas datas
    return $dataInicial->diffInDays($dataFinal);
}

function formatToDouble($value)
{
    if (!$value) return 0.0;

    // Remove separadores de milhares e substitui a vírgula decimal por ponto
    $formatted = str_replace(['.', ','], ['', '.'], $value);

    return (float) $formatted; // Converte para float/double
}
