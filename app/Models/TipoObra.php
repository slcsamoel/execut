<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoObra extends Model
{
    use HasFactory;
    protected $table = 'tipo_de_obra';
    public $timestamps = false;
}
