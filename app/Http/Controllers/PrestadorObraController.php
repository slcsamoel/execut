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
            'obra' => $obra,
            'prestadores' => $prestadores,
        ]);

    }


    public function store(Request $request , Obra $obra)
    {

        $this->validate($request, [
            'idPrestador' =>  'required|max:255',
            'dataInicio'   => 'required|max:255',
        ]);

        $prestador = Prestador::find($request->idPrestador);

        $funcionario = new PrestadorObra();
        $funcionario->idObra = $obra->id;
        $funcionario->idPrestador = $request->idPrestador;
        $funcionario->dataInicio = $request->dataInicio;
        $funcionario->valorDiaria = $prestador->valorDiaria;


        if(!verificarDataIncioDataFim($obra->dataInicio, $funcionario->dataInicio)){
            return back()->with([
                'type' => 'error',
                'message' => 'A  data de inicio não pode ser maior que a data da Obra',
            ]);
        }

        try {

            $funcionario->save();
            return back()->with([
                'type' => 'success',
                'message' => 'Registrado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }


    public function update(Request $request , Obra $obra , PrestadorObra $funcionario)
    {
        $this->validate($request, [
            'dataFim'   => 'required|max:255',
        ]);

        if(!verificarDataIncioDataFim($funcionario->dataInicio , $request->dataFim )){
            return back()->with([
                'type' => 'error',
                'message' => 'A  data de inicio não pode ser maior que a data de fim',
            ]);
        }



        $funcionario->dataFim = $request->dataFim;

        try {

            $funcionario->save();
            return back()->with([
                'type' => 'success',
                'message' => 'Finalizado com sucesso',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    public function destroy(Request $request , Obra $obra , PrestadorObra $funcionario)
    {
        try {
            $funcionario->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Deletado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }


}
