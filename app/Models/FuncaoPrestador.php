<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuncaoPrestador extends Model
{
    use HasFactory;

    protected $table = 'funcao_prestador';

    public $timestamps = false;


    protected $fillable = [
        'nomeFuncao',
        'descricaoFuncao',
    ];

    public function prestadores()
    {
        return $this->hasMany(Prestador::class, 'idFuncao' , 'id');
    }

}
