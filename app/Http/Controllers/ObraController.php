<?php

namespace App\Http\Controllers;

use App\Http\Resources\ObraResource;
use App\Models\Obra;
use Illuminate\Http\Request;

class ObraController extends Controller
{
    public function index()
    {

        $obras = ObraResource::collection(Obra::with('endereco', 'cliente' , 'tipoObra')->paginate(10));

        return inertia('Clientes/Index', [
            'obras' => $obras,
        ]);

    }

}
