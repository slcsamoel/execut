<?php

namespace App\Http\Controllers;

use App\Http\Resources\ObraResource;
use App\Models\Cliente;
use App\Models\Obra;
use App\Models\Pagamento;
use App\Models\TipoObra;
use Illuminate\Http\Request;
use App\Models\Endereco;

class ObraController extends Controller
{
    public function index()
    {

        $obras = ObraResource::collection(Obra::with('endereco', 'cliente' , 'tipoObra')->paginate(10));

        return inertia('Obra/Index', [
            'obras' => $obras,
        ]);

    }

    public function create(Request $request)
    {
        $tipoObras = TipoObra::all();
        $clientes =  Cliente::all();
        $pagamentos = Pagamento::all();

        return inertia('Obra/Create', [
            'tipoObras' => $tipoObras,
            'clientes' => $clientes,
            'pagamentos' => $pagamentos,
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'responsavelObra' => 'required|max:255',
            'dataInicio' => 'required|max:15',
            'dataFim' => 'nullable|max:12',
            'idCliente'=> 'required|max:255',
            'idPagamento'=> 'required|max:255',
            'idTipoObra'=> 'required|max:255',
            'nomeObra'=> 'nullable|max:255',
            'valorOrcamento'=> 'nullable|max:255',
            'previsaoEntrega'=> 'required|max:255',
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

            $obra = new Obra();
            $obra->idEndereco = $endereco->id;
            $obra->responsavelObra = $request->responsavelObra;
            $obra->dataInicio = $request->dataInicio;
            $obra->dataFim = $request->dataFim;
            $obra->idCliente = $request->idCliente;
            $obra->idPagamento = $request->idPagamento;
            $obra->idTipoObra = $request->idTipoObra;
            $obra->nomeObra = $request->nomeObra;
            $obra->valorOrcamento = $request->valorOrcamento;
            $obra->previsaoEntrega = $request->previsaoEntrega;

            $obra->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Obra criado com sucesso',
            ]);


        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }


    }


    public function show (Request $request , Obra $obra)
    {
        $tipoObras = TipoObra::all();
        $clientes =  Cliente::all();
        $pagamentos = Pagamento::all();



    }

}
