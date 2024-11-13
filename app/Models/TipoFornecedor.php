<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoFornecedor extends Model
{
    use HasFactory;
    protected $table = 'tipo_de_fornecedor';
    public $timestamps = false;

}
