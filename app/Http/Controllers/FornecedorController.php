<?php

namespace App\Http\Controllers;

use App\Http\Resources\FornecedorResource;
use App\Models\Fornecedor;
use Illuminate\Http\Request;
use App\Models\Endereco;
use App\Models\TipoFornecedor;

class FornecedorController extends Controller
{
    public function index()
    {
        $fornecedores = FornecedorResource::collection(Fornecedor::with('endereco','tipo')->paginate(10));
        $tipos = TipoFornecedor::all();

        return inertia('Fornecedor/Index', [
            'fornecedores' => $fornecedores,
            'tipos' => $tipos,
        ]);
    }

    public function store (Request $request)
    {
            $this->validate($request, [
                'razaoSocial' => 'nullable|max:255',
                'cnpj' => 'required|max:255',
                'idTipo' => 'required|max:15',
                'telefone' => 'nullable|max:255',
                'logradouro'=> 'required|max:255',
                'complemento'=> 'required|max:255',
                'cidade'=> 'required|max:100',
                'estado'=> 'required|max:2',
            ]);

            $endereco = new Endereco();
            $endereco->logradouro = $request->logradouro;
            $endereco->complemento = $request->complemento;
            $endereco->cidade = $request->cidade;
            $endereco->estado = $request->estado;

        try {
            $endereco->save();

            $fornecedor = new Fornecedor();
            $fornecedor->razaoSocial = $request->razaoSocial;
            $fornecedor->cnpj = preg_replace('/\D/', '', $request->cnpj);
            $fornecedor->idTipo = $request->idTipo;
            $fornecedor->telefone = preg_replace('/\D/', '', $request->telefone);
            $fornecedor->idEndereco = $endereco->id;
            $fornecedor->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Fornecedor criado com sucesso',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function update (Request $request , Fornecedor $fornecedore)
    {
        $this->validate($request, [
            'razaoSocial' => 'nullable|max:255',
            'cnpj' => 'required|max:255',
            'idTipo' => 'required|max:15',
            'telefone' => 'nullable|max:255',
            'logradouro'=> 'required|max:255',
            'complemento'=> 'required|max:255',
            'cidade'=> 'required|max:100',
            'estado'=> 'required|max:2',
        ]);

        if($fornecedore->idEndereco){
            $endereco = Endereco::find($fornecedore->idEndereco);
        }else{
            $endereco = new Endereco();
        }

        $endereco->logradouro = $request->logradouro;
        $endereco->complemento = $request->complemento;
        $endereco->cidade = $request->cidade;
        $endereco->estado = $request->estado;

        try {
            $endereco->save();

            $fornecedore->razaoSocial = $request->razaoSocial;
            $fornecedore->cnpj = preg_replace('/\D/', '', $request->cnpj);
            $fornecedore->idTipo = $request->idTipo;
            $fornecedore->telefone = preg_replace('/\D/', '', $request->telefone);
            $fornecedore->idEndereco = $endereco->id;
            $fornecedore->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Fornecedor Atualizado com sucesso',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }




}
