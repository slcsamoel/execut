<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MateriasObraResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nomeMaterial' => $this->nomeMaterial,
            'descricaoMaterial' => $this->descricaoMaterial,
            'valor' => $this->valor,
            'idObra' => $this->idObra,
            'idFornecedor' => $this->idFornecedor,
            'fornecedor' => $this->fornecedor,
        ];
    }
}
