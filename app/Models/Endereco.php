<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
    use HasFactory;

    protected $table = 'endereco';

    // Desabilitar timestamps automáticos
    public $timestamps = false;


    protected $fillable = [
        'logradouro',
        'complemento',
        'cidade',
        'estado',
    ];


    public function usuario()
    {
        return $this->hasMany(User::class , 'idEndereco' , 'id');
    }

    public function cliente()
    {
        return $this->hasMany(Cliente::class , 'idEndereco' , 'id');
    }

    public function obra()
    {
        return $this->hasMany(Obra::class , 'idEndereco' , 'id');
    }


}
