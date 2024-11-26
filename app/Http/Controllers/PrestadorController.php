<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrestadorResource;
use App\Models\FuncaoPrestador;
use Illuminate\Http\Request;
use App\Models\Prestador;
use Barryvdh\DomPDF\Facade\Pdf;

class PrestadorController extends Controller
{

    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $query = Prestador::with('funcao');
        if (!empty($search)) {
            $query->where('nomePrestador', 'like', "%{$search}%");
                // ->orWhere('email', 'like', "%{$search}%")
                // ->orWhere('cpf', 'like', "%{$search}%");
        }

        $prestadores =  PrestadorResource::collection($query->paginate(10));
        $funcoes = FuncaoPrestador::all();
        return inertia('Prestador/Index', [
            'prestadores' => $prestadores,
            'funcoes' => $funcoes,
            'search' => $search,
        ]);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'nomePrestador' => 'required|max:255',
            'tipoPrestador' => 'required|max:255',
            'cpfCnpj'   => 'required|max:255',
            'telefone' => 'required|max:255',
            'idFuncao' => 'required|max:3',
            'valorDiaria' => 'required|max:10',
        ]);

        $prestador = new Prestador();
        $prestador->nomePrestador = $request->nomePrestador;
        $prestador->tipoPrestador = $request->tipoPrestador;
        $prestador->cpfCnpj = preg_replace('/\D/', '', $request->cpfCnpj);
        $prestador->telefone = preg_replace('/\D/', '', $request->telefone);
        $prestador->valorDiaria = formatToDouble($request->valorDiaria);
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
            'idFuncao' => 'required|max:3',
            'valorDiaria' => 'required|max:10',
        ]);

        $prestadore->nomePrestador = $request->nomePrestador;
        $prestadore->tipoPrestador = $request->tipoPrestador;
        $prestadore->cpfCnpj = preg_replace('/\D/', '', $request->cpfCnpj);
        $prestadore->telefone = preg_replace('/\D/', '', $request->telefone);
        $prestadore->valorDiaria = formatToDouble($request->valorDiaria);
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

    public function gerarRelatorioGeral(Request $request)
    {
         // Obtenha os dados dos clientes
        $prestadores =  Prestador::with('funcao')->get();

        // Gere a view para o PDF
        $pdf = Pdf::loadView('relatorios.prestadores', compact('prestadores'));

        // Configurar para forçar o download
        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="relatorio_prestadores.pdf"');
    }


}
