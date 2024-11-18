<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoObra;
use App\Http\Resources\TipoObraResource;


class TipoObraController extends Controller
{

    public function index()
    {
        $tipos = TipoObraResource::collection(TipoObra::paginate(10));

        return inertia('TipoObra/Index', [
            'tipos' => $tipos,
        ]);

    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nomeTipo' => 'required|max:255',
            'descricaoTipo' => 'nullable|max:255',
        ]);

        $tipos_obra = new TipoObra();
        $tipos_obra->nomeTipo = $request->nomeTipo;
        $tipos_obra->descricaoTipo = $request->descricaoTipo;
        $tipos_obra->save();

        try {
            $tipos_obra->save();

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

    public function update(Request $request , TipoObra $tipos_obra)
    {
        $this->validate($request, [
            'nomeTipo' => 'required|max:255',
            'descricaoTipo' => 'nullable|max:255',
        ]);

        $tipos_obra->nomeTipo = $request->nomeTipo;
        $tipos_obra->descricaoTipo = $request->descricaoTipo;


        try {
            $tipos_obra->save();

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

    public function destroy (Request $request , TipoObra $tipos_obra)
    {
        try {
            $tipos_obra->delete();

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
