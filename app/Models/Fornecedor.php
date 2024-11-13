<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{
    use HasFactory;
    protected $table = 'fornecedor';
    public $timestamps = false;


    protected $fillable = [
        'razaoSocial',
        'cnpj',
        'telefone',
        'idTipo',
        'idEndereco',
        'cnpj'
    ];

    public function endereco()
    {
        return $this->belongsTo(Endereco::class, 'idEndereco');
    }

    public function tipo()
    {
        return $this->belongsTo(TipoFornecedor::class, 'idTipo');
    }

}
