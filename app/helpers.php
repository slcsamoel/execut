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

    // Retorna true se data_inicio for menor ou igual a data_fim
    return $data_inicio->lte($data_fim);
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

function getTelefoneFormatadoAttribute($telefone)
{
    $telefone = preg_replace('/\D/', '', $telefone); // Remove todos os caracteres não numéricos

    if (strlen($telefone) === 10) {
        // Formato para telefones fixos: (99) 9999-9999
        return preg_replace('/(\d{2})(\d{4})(\d{4})/', '($1) $2-$3', $telefone);
    } elseif (strlen($telefone) === 11) {
        // Formato para celulares: (99) 9 9999-9999
        return preg_replace('/(\d{2})(\d{1})(\d{4})(\d{4})/', '($1) $2 $3-$4', $telefone);
    }
    // Retorna o valor original se não corresponder aos formatos esperados
    return $telefone;
}

function maskMoney($value)
{
    if ($value === null || $value === '') {
        return ''; // Trata valores nulos ou vazios
    }

    // Remove tudo que não for número ou ponto/vírgula
    $numericValue = preg_replace('/[^\d.,]/', '', $value);

    // Substitui vírgula por ponto
    $numericValue = str_replace(',', '.', $numericValue);

    // Verifica se o valor é numérico
    if (!is_numeric($numericValue)) {
        return ''; // Retorna vazio caso o valor não seja válido
    }

    // Converte para número float
    $number = (float)$numericValue;

    // Formata o número no padrão de moeda BR (R$)
    return number_format($number, 2, ',', '.');
}

function statusObra($status)
{
    if ($status === 1) {
        return "Em andamento";
    } elseif ($status === 2) {
        return "Pausada";
    } elseif ($status === 3) {
        return "Cancelada";
    } elseif ($status === 4) {
        return "Concluída";
    }

    return null; // Retorna null se o status não corresponder a nenhum caso
}

