<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\FuncaoPrestadorController;
use App\Http\Controllers\PrestadorController;
use App\Http\Controllers\ObraController;
use App\Http\Controllers\PrestadorObraController;
use App\Http\Controllers\MateriasObraController;
use App\Http\Controllers\FornecedorController;
use App\Http\Controllers\PagamentoController;
use App\Http\Controllers\TipoFornecedorController;
use App\Http\Controllers\TipoObraController;

// Route::get('/', HomeController::class)->name('home');

/** Caches **/
Route::get('/clear-cache', function () {
    $exitCode = Artisan::call('config:clear');
    $exitCode = Artisan::call('cache:clear');
    $exitCode = Artisan::call('config:cache');
    return 'DONE'; //Return anything
});

Route::middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

    //Usuarios
    Route::apiResource('users', UserController::class);
    //clientes
    Route::apiResource('clientes', ClienteController::class);
    //Funções de prestadores
    Route::apiResource('funcoes', FuncaoPrestadorController::class);
    //Prestadores
    Route::apiResource('prestadores', PrestadorController::class);
    //Obras
    Route::resource('obras', ObraController::class);
    Route::apiResource('obras/{obra}/funcionarios', PrestadorObraController::class);
    Route::apiResource('obras/{obra}/materiais', MateriasObraController::class);
    Route::get('obras/{obra}/relatorio',[ObraController::class , 'relatorioDaObra'])->name('obras.relatorio');
    Route::post('obras/{obra}/finalizar',[ObraController::class , 'finalizarObra'])->name('obras.finalizar');
    Route::post('obras/{obra}/cancelar',[ObraController::class , 'cancelarObra'])->name('obras.cancelar');
    Route::apiResource('tipos-obras', TipoObraController::class);
    //Fornecedores
    Route::apiResource('fornecedores', FornecedorController::class);
    Route::apiResource('tipos-fornecedores', TipoFornecedorController::class);

    //Pagamentos
    Route::apiResource('pagamentos', PagamentoController::class);

    //Perfil
    Route::get('profile', ProfileController::class)->name('profile');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
});

