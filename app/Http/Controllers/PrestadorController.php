<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrestadorResource;
use App\Models\FuncaoPrestador;
use Illuminate\Http\Request;
use App\Models\Prestador;

class PrestadorController extends Controller
{

    public function index()
    {
        $prestadores =  PrestadorResource::collection(Prestador::with('funcao')->paginate(10));
        $funcoes = FuncaoPrestador::all();
        return inertia('Prestador/Index', [
            'prestadores' => $prestadores,
            'funcoes' => $funcoes
        ]);
    }


}
