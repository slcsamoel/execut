<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Obra;
use App\Models\Prestador;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {

        $clientes = Cliente::all()->count();
        $prestadores = Prestador::all()->count();
        $obras = Obra::all()->count();

        return inertia('Dashboard' , [
            'clientes' => $clientes,
            'prestadores' => $prestadores,
            'obras' => $obras
        ]);
    }
}
