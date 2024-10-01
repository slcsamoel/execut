<?php

namespace App\Http\Controllers;

use App\Http\Resources\FuncaoPrestadorResource;
use Illuminate\Http\Request;
use App\Models\FuncaoPrestador;

class FuncaoPrestadorController extends Controller
{

    public function index()
    {
        $funcoes = FuncaoPrestadorResource::collection(FuncaoPrestador::paginate(10));
        return inertia('Funcao/Index', [
            'funcoes' => $funcoes,
        ]);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'nomeFuncao' => 'required|max:255',
            'descricaoFuncao' => 'nullable|max:255',
        ]);

        $funcao = new FuncaoPrestador();
        $funcao->nomeFuncao = $request->nomeFuncao;
        $funcao->descricaoFuncao = $request->descricaoFuncao;


        try {
            $funcao->save();
            return back()->with([
                'type' => 'success',
                'message' => 'Função criado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function update(Request $request , FuncaoPrestador $funcao)
    {
        $this->validate($request, [
            'nomeFuncao' => 'required|max:255',
            'descricaoFuncao' => 'nullable|max:255',
        ]);

        $funcao->nomeFuncao = $request->nomeFuncao;
        $funcao->descricaoFuncao = $request->descricaoFuncao;

        try {
            $funcao->save();
            return back()->with([
                'type' => 'success',
                'message' => 'Função  alterado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    public function destroy(FuncaoPrestador $funcao)
    {
        $funcao->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }

}
