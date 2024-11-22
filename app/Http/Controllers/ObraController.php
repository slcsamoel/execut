<?php

namespace App\Http\Controllers;

use App\Http\Resources\ObraResource;
use App\Models\Cliente;
use App\Models\Obra;
use App\Models\Pagamento;
use App\Models\TipoObra;
use Illuminate\Http\Request;
use App\Models\Endereco;
use App\Models\MaterialDeObra;
use App\Models\PrestadorObra;

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

        if(!verificarDataIncioDataFim($request->dataInicio, $request->previsaoEntrega)){
            return back()->with([
                'type' => 'error',
                'message' => 'A  data de inicio não pode ser maior que previsão de entrega',
            ]);
        }


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
            $obra->valorOrcamento = formatToDouble($request->valorOrcamento);
            $obra->previsaoEntrega = $request->previsaoEntrega;
            $obra->status= 1;
            $obra->save();

            return redirect(route('obras.edit',['obra' => $obra->id]))->with([
                'type' => 'success',
                'message' => 'Obra criado com sucesso'
            ]);


        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }


    }

    public function edit (Request $request , Obra $obra)
    {
        $tipoObras = TipoObra::all();
        $clientes =  Cliente::all();
        $pagamentos = Pagamento::all();

        $obraEdit = Obra::with('endereco', 'cliente' , 'tipoObra')->where('id', $obra->id )->first();

        $arrayValorObra = $this->calcularValorObra($obra);

        return inertia('Obra/Edit', [
            'tipoObras' => $tipoObras,
            'clientes' => $clientes,
            'pagamentos' => $pagamentos,
            'obra' => $obraEdit,
            'valorObra' => $arrayValorObra['valorObra'],
            'valorMateria' => $arrayValorObra['valorMateria'],
            'valorPrestador' => $arrayValorObra['valorPrestador'],
        ]);

    }

    public function update(Request $request , Obra $obra)
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

        if(!verificarDataIncioDataFim($request->dataInicio, $request->previsaoEntrega)){
            return back()->with([
                'type' => 'error',
                'message' => 'A  data de inicio não pode ser maior que previsão de entrega',
            ]);
        }

        if($obra->idEndereco){
            $endereco = Endereco::find($obra->idEndereco);
        }else{
            $endereco = new Endereco();
        }

        $endereco->logradouro = $request->logradouro;
        $endereco->complemento = $request->complemento;
        $endereco->cidade = $request->cidade;
        $endereco->estado = $request->estado;

        try {
            $endereco->save();
            $obra->idEndereco = $endereco->id;
            $obra->responsavelObra = $request->responsavelObra;
            $obra->dataInicio = $request->dataInicio;
            $obra->dataFim = $request->dataFim;
            $obra->idCliente = $request->idCliente;
            $obra->idPagamento = $request->idPagamento;
            $obra->idTipoObra = $request->idTipoObra;
            $obra->nomeObra = $request->nomeObra;
            $obra->valorOrcamento = formatToDouble($request->valorOrcamento);
            $obra->previsaoEntrega = $request->previsaoEntrega;
            $obra->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Obra Atualizada com sucesso',
            ]);

        } catch (\Throwable $th) {

            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }


    }

    public function relatorioDaObra (Request $request , Obra $obra)
    {
        $obra = Obra::with('endereco', 'cliente' , 'tipoObra', 'pagamento')->where('id', $obra->id )->first();
        $materias = MaterialDeObra::with('fornecedor')->where('idObra' , $obra->id)->get();
        $prestadores = PrestadorObra::with('prestador')->where('idObra' , $obra->id)->get();

        $valorObra = 0;
        $valorMateria = 0;
        $valorPrestador = 0;

        foreach ($materias as $materia) {
            $valorMateria += $materia->valor;
        }

        foreach ($prestadores as $prestadorObra) {
                $diasTrabalhados = calcularDiferencaDias($prestadorObra->dataInicio , $prestadorObra->dataFim ? $prestadorObra->dataFim : null);
                $prestadorObra->diasTrabalhados = $diasTrabalhados;
                $prestadorObra->valorTotalTrabalhado = (intval($diasTrabalhados) * intval($prestadorObra->prestador->valorDiaria));
                $valorPrestador += $prestadorObra->valorTotalTrabalhado;
        }

        $valorObra = ($valorMateria + $valorPrestador);


        return inertia('Obra/Relatorio', [
            'valorObra' => $valorObra,
            'valorMateria' => $valorMateria,
            'valorPrestador' => $valorPrestador,
            'obra' => $obra,
            'materias' => $materias,
            'prestadores' => $prestadores,
        ]);
    }

    public function finalizarObra (Request $request , Obra $obra)
    {

        try {

            $valorFinal = $this->calcularValorFinalObra($obra);
            $obra->dataFim = date('Y-m-d');
            $obra->valorFinal = $valorFinal;
            $obra->status = 4;
            $obra->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Obra Finalizada com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    public function cancelarObra(Request $request , Obra $obra)
    {

        try {

            $valorFinal = $this->calcularValorFinalObra($obra);
            $obra->dataFim = date('Y-m-d');
            $obra->valorFinal = $valorFinal;
            $obra->status = 3;
            $obra->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Obra Cancelada com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    protected function calcularValorObra($obra)
    {
        $materias = MaterialDeObra::with('fornecedor')->where('idObra' , $obra->id)->get();
        $prestadores = PrestadorObra::with('prestador')->where('idObra' , $obra->id)->get();
        $valorObra = 0;
        $valorMateria = 0;
        $valorPrestador = 0;

        foreach ($materias as $materia) {
            $valorMateria += $materia->valor;
        }

        foreach ($prestadores as $prestadorObra) {
            $diasTrabalhados = calcularDiferencaDias($prestadorObra->dataInicio , $prestadorObra->dataFim ? $prestadorObra->dataFim : null);
            $prestadorObra->diasTrabalhados = $diasTrabalhados;
            $prestadorObra->valorTotalTrabalhado = (intval($diasTrabalhados) * intval($prestadorObra->prestador->valorDiaria));
            $valorPrestador += $prestadorObra->valorTotalTrabalhado;
        }

        $valorObra = ($valorMateria + $valorPrestador);

        return  array(
            'valorObra' => $valorObra,
            'valorMateria' => $valorMateria,
            'valorPrestador' => $valorPrestador,
        );

    }


    protected function calcularValorFinalObra($obra)
    {
        $materias = MaterialDeObra::with('fornecedor')->where('idObra' , $obra->id)->get();
        $prestadores = PrestadorObra::with('prestador')->where('idObra' , $obra->id)->get();
        $valorObra = 0;
        $valorMateria = 0;
        $valorPrestador = 0;

        foreach ($materias as $materia) {
            $valorMateria += $materia->valor;
        }

        foreach ($prestadores as $prestadorObra) {
            $diasTrabalhados = calcularDiferencaDias($prestadorObra->dataInicio , $prestadorObra->dataFim ? $prestadorObra->dataFim : null);
            $valorPrestador += (intval($diasTrabalhados) * intval($prestadorObra->prestador->valorDiaria));
            if(is_null($prestadorObra->dataFim)){
                $prestadorObra->dataFim = now();
                $prestadorObra->save();
            }
        }
        $valorObra = ($valorMateria + $valorPrestador);
        return $valorObra;

    }

}
