<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PrestadorObraResource extends JsonResource
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
            'dataFim' => $this->dataFim,
            'dataInicio' => $this->dataInicio,
            'idObra' => $this->idObra,
            'idPrestador' => $this->idPrestador,
            'prestador' => $this->prestador,
        ];
    }
}
