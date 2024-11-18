<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoFornecedor extends Model
{
    use SoftDeletes;
    protected $table = 'tipo_de_fornecedor';
    public $timestamps = false;


    protected $fillable = [
        'nomeTipo',
        'descricao',
        'deleted_at'
    ];


}
