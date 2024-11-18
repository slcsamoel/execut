<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FuncaoPrestador extends Model
{
    use SoftDeletes;
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
