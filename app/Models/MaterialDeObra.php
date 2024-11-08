<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialDeObra extends Model
{
    use HasFactory;

    protected $table = 'material_de_obra';
    public $timestamps = false;

    protected $fillable = [
        'nomeMaterial',
        'descricaoMaterial',
        'valor',
        'idFornecedor',
        'idObra',
        'dataCompra',
    ];


    public function fornecedor()
    {
        return $this->belongsTo(Fornecedor::class, 'idFornecedor');
    }

    public function obra()
    {
        return $this->belongsTo(Obra::class, 'idObra');
    }



}
