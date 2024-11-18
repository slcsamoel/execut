<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use SoftDeletes;
    protected $table = 'cliente';
    public $timestamps = false;


    protected $fillable = [
        'nomeCliente',
        'razaoSocial',
        'cpfCnpj',
        'telefone',
        'idEndereco'
    ];

    public function endereco(){
        return $this->belongsTo(Endereco::class, 'idEndereco');
    }
}
