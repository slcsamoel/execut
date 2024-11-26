<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FornecedorResource extends JsonResource
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
            'razaoSocial' => $this->razaoSocial,
            'cnpj' => $this->cnpj,
            'telefone' => $this->telefone,
            'endereco' => $this->endereco,
            'idTipo' => $this->idTipo,
            'tipo' => $this->tipo,
        ];
    }
}
