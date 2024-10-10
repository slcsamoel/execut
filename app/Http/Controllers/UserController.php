<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\Endereco;
use App\Models\User;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class UserController extends Controller
{

    public function index()
    {
        $users = UserResource::collection(User::with('endereco')->latest()->paginate(10));
        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }

    public function store(UserRequest $request)
    {

        $this->validate($request, [
            'nomeUsuario' => 'required|max:255',
            'razaoSocial' => 'nullable|max:255',
            'cpfCnpj' => 'required|max:15',
            'telefone' => 'nullable|max:12',
            'email' => 'required|max:150',
            'password' => 'required|max:255',
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

            $usuario = new User();
            $usuario->nomeUsuario = $request->nomeUsuario;
            $usuario->razaoSocial = $request->razaoSocial;
            $usuario->cpfCnpj = $request->cpfCnpj;
            $usuario->telefone = $request->telefone;
            $usuario->email = $request->email;
            $usuario->password = bcrypt($request->password);
            $usuario->idEndereco = $endereco->id;
            $usuario->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Usuario criado com sucesso',
            ]);


        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function update(UserRequest $request, User $user)
    {

        $this->validate($request, [
            'nomeUsuario' => 'required|max:255',
            'razaoSocial' => 'nullable|max:255',
            'cpfCnpj' => 'required|max:15',
            'telefone' => 'nullable|max:12',
            'email' => 'required|max:150',
            'logradouro'=> 'required|max:255',
            'password' => 'required|max:255',
            'complemento'=> 'required|max:255',
            'cidade'=> 'required|max:100',
            'estado'=> 'required|max:2',

        ]);

            if($user->idEndereco){
                $endereco = Endereco::find($user->idEndereco);
            }else{
                $endereco = new Endereco();
            }

            $endereco->logradouro = $request->logradouro;
            $endereco->complemento = $request->complemento;
            $endereco->cidade = $request->cidade;
            $endereco->estado = $request->estado;

        try {

            $endereco->save();
            $user->nomeUsuario = $request->nomeUsuario;
            $user->razaoSocial = $request->razaoSocial;
            $user->cpfCnpj = $request->cpfCnpj;
            $user->telefone = $request->telefone;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->idEndereco = $endereco->id;
            $user->update();

            return back()->with([
                'type' => 'success',
                'message' => 'Usuario alterado com sucesso',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }
}
