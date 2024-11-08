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

    Route::apiResource('users', UserController::class);
    Route::apiResource('clientes', ClienteController::class);
    Route::apiResource('funcoes', FuncaoPrestadorController::class);
    Route::apiResource('prestadores', PrestadorController::class);
    //Obras
    Route::resource('obras', ObraController::class);
    Route::apiResource('obras/{obra}/funcionarios', PrestadorObraController::class);
    Route::apiResource('obras/{obra}/materiais', MateriasObraController::class);
    //Obras

    Route::get('profile', ProfileController::class)->name('profile');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
    // Route::get('register', [RegisterController::class, 'create'])->name('register');
    // Route::post('register', [RegisterController::class, 'store']);
    // Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
    // Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});

