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

    public function store(Request $request)
    {

        $this->validate($request, [
            'nomePrestador' => 'required|max:255',
            'tipoPrestador' => 'required|max:255',
            'cpfCnpj'   => 'required|max:255',
            'telefone' => 'required|max:255',
            'idFuncao' => 'required|max:1',
            'valorDiaria' => 'required|max:10',
        ]);

        $prestador = new Prestador();
        $prestador->nomePrestador = $request->nomePrestador;
        $prestador->tipoPrestador = $request->tipoPrestador;
        $prestador->cpfCnpj = $request->cpfCnpj;
        $prestador->telefone = $request->telefone;
        $prestador->valorDiaria = $request->valorDiaria;
        $prestador->idFuncao = $request->idFuncao;


        try {

            $prestador->save();
            return back()->with([
                'type' => 'success',
                'message' => 'Prestador criado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function update(Request $request , Prestador $prestadore)
    {
        $this->validate($request, [
            'nomePrestador' => 'required|max:255',
            'tipoPrestador' => 'required|max:255',
            'cpfCnpj'   => 'required|max:255',
            'telefone' => 'required|max:255',
            'idFuncao' => 'required|max:1',
            'valorDiaria' => 'required|max:10',
        ]);

        $prestadore->nomePrestador = $request->nomePrestador;
        $prestadore->tipoPrestador = $request->tipoPrestador;
        $prestadore->cpfCnpj = $request->cpfCnpj;
        $prestadore->telefone = $request->telefone;
        $prestadore->valorDiaria = $request->valorDiaria;
        $prestadore->idFuncao = $request->idFuncao;

        try {

            $prestadore->update();

            return back()->with([
                'type' => 'success',
                'message' => 'Prestador  alterada com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    public function destroy(Prestador $prestadore)
    {
        try {
        $prestadore->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Prestador Deletado com sucesso',
        ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }


}
