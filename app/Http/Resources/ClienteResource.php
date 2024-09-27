<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClienteResource extends JsonResource
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
            'nomeCliente' => $this->nomeCliente,
            'razaoSocial' => $this->razaoSocial,
            'cpfCnpj' => $this->cpfCnpj,
            'telefone' => $this->telefone,
            'endereco' => $this->endereco,
        ];
    }
}
