<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Obra;
use App\Models\MaterialDeObra;
use App\Http\Resources\MateriasObraResource;
use App\Models\Fornecedor;

class MateriasObraController extends Controller
{
    public function index (Request $request , Obra $obra)
    {
        $materiaisObra = MateriasObraResource::collection(MaterialDeObra::with('fornecedor')->where('idObra' , $obra->id)->paginate(10));
        $fornecedores = Fornecedor::all();

        return inertia('Obra/Materiais/Index', [
            'materiaisObra' => $materiaisObra,
            'obra' => $obra,
            'fornecedores' => $fornecedores,
        ]);

    }


    public function store(Request $request , Obra $obra)
    {
        $this->validate($request, [
            'nomeMaterial' =>  'required|max:255',
            'descricaoMaterial'   => 'required|max:255',
            'valor'   => 'required|max:255',
            'idFornecedor'   => 'required|max:255',
            'dataCompra' =>  'required|max:255',
        ]);

        $material = new MaterialDeObra();
        $material->nomeMaterial = $request->nomeMaterial;
        $material->descricaoMaterial = $request->descricaoMaterial;
        $material->valor = $request->valor;
        $material->idFornecedor = $request->idFornecedor;
        $material->dataCompra = $request->dataCompra;
        $material->idObra = $obra->id;

        try {
            $material->save();

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

}
