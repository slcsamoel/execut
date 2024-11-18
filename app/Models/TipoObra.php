<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoObra extends Model
{
    use SoftDeletes;
    protected $table = 'tipo_de_obra';
    public $timestamps = false;

    protected $fillable = [
        'nomeTipo',
        'descricaoTipo',
        'deleted_at'
    ];
}
