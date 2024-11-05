<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrestadorObra extends Model
{
    use HasFactory;
    protected $table = 'prestador_obra';
    public $timestamps = false;

    protected $fillable = [
        'idPrestador',
        'idObra',
        'dataInicio',
        'dataFim',
    ];


    public function prestador()
    {
        return $this->belongsTo(Prestador::class, 'idPrestador')->with('funcao');
    }

    public function obra()
    {
        return $this->belongsTo(Obra::class, 'idObra');
    }
}
