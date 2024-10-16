<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prestador extends Model
{
    use HasFactory;

    protected $table = 'prestador';

    public $timestamps = false;


    protected $fillable = [
        'nomePrestador',
        'tipoPrestador',
        'cpfCnpj',
        'telefone',
        'idFuncao',
        'valorDiaria'
    ];

    public function funcao()
    {
        return $this->belongsTo(FuncaoPrestador::class , 'idFuncao');
    }

}
