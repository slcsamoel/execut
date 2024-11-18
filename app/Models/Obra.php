<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Obra extends Model
{
    use SoftDeletes;

    protected $table = 'obra';

    // Desabilitar timestamps automáticos
    public $timestamps = false;


    protected $fillable = [
        'valorFinal',
        'responsavelObra',
        'dataInicio',
        'dataFim',
        'idCliente',
        'idPagamento',
        'idEndereco',
        'idTipoObra',
        'nomeObra',
        'valorOrcamento',
        'status'
    ];


    public function endereco(){
        return $this->belongsTo(Endereco::class, 'idEndereco');
    }

    public function cliente(){
        return $this->belongsTo(Cliente::class, 'idCliente');
    }

    public function pagamento(){
        return $this->belongsTo(Pagamento::class, 'idPagamento');
    }

    public function tipoObra(){
        return $this->belongsTo(TipoObra::class, 'idTipoObra');
    }

    public function prestadoresObras()
    {
        return $this->hasMany(PrestadorObra::class , 'idObra')->with('prestador');
    }

    public function materiaisObras()
    {
        return $this->hasMany(MaterialDeObra::class , 'idObra')->with('fornecedor');
    }


}
