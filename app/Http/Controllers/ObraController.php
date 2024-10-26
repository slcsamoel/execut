<?php

namespace App\Http\Controllers;

use App\Http\Resources\ObraResource;
use App\Models\Cliente;
use App\Models\Obra;
use App\Models\Pagamento;
use App\Models\TipoObra;
use Illuminate\Http\Request;

class ObraController extends Controller
{
    public function index()
    {

        $obras = ObraResource::collection(Obra::with('endereco', 'cliente' , 'tipoObra')->paginate(10));

        return inertia('Obra/Index', [
            'obras' => $obras,
        ]);

    }

    public function create(Request $request)
    {
        $tipoObras = TipoObra::all();
        $clientes =  Cliente::all();
        $pagamentos = Pagamento::all();

        return inertia('Obra/Create', [
            'tipoObras' => $tipoObras,
            'clientes' => $clientes,
            'pagamentos' => $pagamentos,
        ]);
    }

    public function show () {
        
    }

}
