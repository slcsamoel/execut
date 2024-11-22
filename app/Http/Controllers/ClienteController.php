<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClienteResource;
use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Models\Endereco;

class ClienteController extends Controller
{

    public function index()
    {
        $clientes = ClienteResource::collection(Cliente::with('endereco')->paginate(10));
        return inertia('Clientes/Index', [
            'clientes' => $clientes,
        ]);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'nomeCliente' => 'required|max:255',
            'razaoSocial' => 'nullable|max:255',
            'cpfCnpj' => 'required|max:255',
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

            $cliente = new Cliente();
            $cliente->nomeCliente = $request->nomeCliente;
            $cliente->razaoSocial = $request->razaoSocial;
            $cliente->cpfCnpj = preg_replace('/\D/', '', $request->cpfCnpj);
            $cliente->telefone = preg_replace('/\D/', '', $request->telefone);
            $cliente->idEndereco = $endereco->id;
            $cliente->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Cliente criado com sucesso',
            ]);


        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function update(Request $request, Cliente $cliente)
    {

        $this->validate($request, [
            'nomeCliente' => 'required|max:255',
            'razaoSocial' => 'nullable|max:255',
            'cpfCnpj' => 'required|max:255',
            'telefone' => 'nullable|max:255',
            'logradouro'=> 'required|max:255',
            'complemento'=> 'required|max:255',
            'cidade'=> 'required|max:100',
            'estado'=> 'required|max:2',

        ]);

            if($cliente->idEndereco){
                $endereco = Endereco::find($cliente->idEndereco);
            }else{
                $endereco = new Endereco();
            }

            $endereco->logradouro = $request->logradouro;
            $endereco->complemento = $request->complemento;
            $endereco->cidade = $request->cidade;
            $endereco->estado = $request->estado;

        try {

            $endereco->save();
            $cliente->nomeCliente = $request->nomeCliente;
            $cliente->razaoSocial = $request->razaoSocial;
            $cliente->cpfCnpj = preg_replace('/\D/', '', $request->cpfCnpj);
            $cliente->telefone = preg_replace('/\D/', '', $request->telefone);
            $cliente->idEndereco = $endereco->id;
            $cliente->update();

            return back()->with([
                'type' => 'success',
                'message' => 'Cliente alterado com sucesso',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }

}
