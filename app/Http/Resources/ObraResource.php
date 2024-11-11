<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ObraResource extends JsonResource
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
            'valorFinal' => $this->valorFinal ,
            'responsavelObra' => $this->responsavelObra,
            'dataInicio' => $this->dataInicio,
            'dataFim' => $this->dataFim,
            'cliente' => $this->cliente,
            'pagamento' => $this->pagamento,
            'endereco' => $this->endereco,
            'tipoObra'  => $this->tipoObra,
            'nomeObra' => $this->nomeObra,
            'status' => $this->status,
            'valorOrcamento' => $this->valorOrcamento,
        ];
    }
}
