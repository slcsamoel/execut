<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'cliente';

    public $timestamps = false;


    protected $fillable = [
        'nomeCliente',
        'razaoSocial',
        'cpfCnpj',
        'telefone',
    ];

    public function endereco(){
        return $this->belongsTo(Endereco::class, 'idEndereco');
    }
}
