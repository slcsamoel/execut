<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obra extends Model
{
    use HasFactory;

    protected $table = 'endereco';

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
        'nomeObra'
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


}
