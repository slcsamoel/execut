<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoFornecedor;
use App\Http\Resources\TipoFornecedorResource;


class TipoFornecedorController extends Controller
{

    public function index()
    {
        $tipos = TipoFornecedorResource::collection(TipoFornecedor::paginate(10));

        return inertia('TipoFornecedor/Index', [
            'tipos' => $tipos,
        ]);

    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nomeTipo' => 'required|max:255',
            'descricao' => 'nullable|max:255',
        ]);

        $tipos_fornecedore = new TipoFornecedor();
        $tipos_fornecedore->nomeTipo = $request->nomeTipo;
        $tipos_fornecedore->descricao = $request->descricao;

        try {
            $tipos_fornecedore->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Tipo criado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    public function update(Request $request , TipoFornecedor $tipos_fornecedore)
    {
        $this->validate($request, [
            'nomeTipo' => 'required|max:255',
            'descricao' => 'nullable|max:255',
        ]);

        $tipos_fornecedore->nomeTipo = $request->nomeTipo;
        $tipos_fornecedore->descricao = $request->descricao;


        try {
            $tipos_fornecedore->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Tipo alterado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    public function destroy (Request $request , TipoFornecedor $tipos_fornecedore)
    {
        try {
            $tipos_fornecedore->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Tipo Deletado',
            ]);
            } catch (\Throwable $th) {
                return back()->with([
                    'type' => 'error',
                    'message' => $th->getMessage(),
                ]);
            }

    }

}
