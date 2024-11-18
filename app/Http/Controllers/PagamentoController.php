<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pagamento;
use App\Http\Resources\PagamentoResource;

class PagamentoController extends Controller
{

    public function index()
    {
        $pagamentos = PagamentoResource::collection(Pagamento::paginate(10));

        return inertia('Pagamentos/Index', [
            'pagamentos' => $pagamentos,
        ]);

    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'tipoPagamento' => 'required|max:255',
            'moeda' => 'nullable|max:255',
        ]);

        $pagamento = new Pagamento();
        $pagamento->tipoPagamento = $request->tipoPagamento;
        $pagamento->moeda = $request->moeda;
        try {
            $pagamento->save();
            return back()->with([
                'type' => 'success',
                'message' => 'Pagamento criado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    public function update(Request $request , Pagamento $pagamento)
    {
        $this->validate($request, [
            'tipoPagamento' => 'required|max:255',
            'moeda' => 'nullable|max:255',
        ]);

        $pagamento->tipoPagamento = $request->tipoPagamento;
        $pagamento->moeda = $request->moeda;


        try {
            $pagamento->save();
            return back()->with([
                'type' => 'success',
                'message' => 'Pagamento alterado com sucesso',
            ]);

        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }

    }

    public function destroy (Request $request , Pagamento $pagamento)
    {
        try {
            $pagamento->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Pagamento Deletada',
            ]);
            } catch (\Throwable $th) {
                return back()->with([
                    'type' => 'error',
                    'message' => $th->getMessage(),
                ]);
            }

    }


}
