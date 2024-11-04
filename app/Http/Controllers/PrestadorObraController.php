<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrestadorObraResource;
use Illuminate\Http\Request;
use App\Models\Obra;
use App\Models\Prestador;
use App\Models\PrestadorObra;

class PrestadorObraController extends Controller
{

    public function index( Request $request , Obra $obra)
    {
        $prestadoresObras = PrestadorObraResource::collection(PrestadorObra::with('prestador')->where('idObra' , $obra->id)->paginate(10));
        $prestadores = Prestador::with('funcao')->get();

        return inertia('Obra/Prestadores/Index', [
            'prestadoresObras' => $prestadoresObras,
            'Obra' => $obra,
            'prestadores' => $prestadores,
        ]);

    }


}
