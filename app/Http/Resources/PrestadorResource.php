<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PrestadorResource extends JsonResource
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
            'nomePrestador' => $this->nomePrestador ,
            'tipoPrestador' => $this->tipoPrestador,
            'cpfCnpj' => $this->cpfCnpj,
            'telefone' => $this->telefone,
            'funcao'  => $this->funcao,
        ];
    }
}
