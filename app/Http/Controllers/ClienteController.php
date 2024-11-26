<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClienteResource;
use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Models\Endereco;
use Barryvdh\DomPDF\Facade\Pdf;

class ClienteController extends Controller
{

    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $query = Cliente::with('endereco');
        if (!empty($search)) {
            $query->where('nomeCliente', 'like', "%{$search}%");
                // ->orWhere('email', 'like', "%{$search}%")
                // ->orWhere('cpf', 'like', "%{$search}%");
        }
         $clientes = ClienteResource::collection($query->paginate(10));
        return inertia('Clientes/Index', [
            'clientes' => $clientes,
            'search' => $search,
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

    public function gerarRelatorioGeral(Request $request)
    {
         // Obtenha os dados dos clientes
        $clientes = Cliente::with('endereco')->get();

        // Gere a view para o PDF
        $pdf = Pdf::loadView('relatorios.clientes', compact('clientes'));

        // Configurar para forçar o download
        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="relatorio_clientes.pdf"');
    }

}
