<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       DB::table('usuario')->insert([
            'nomeUsuario' => 'Admin',
            'razaoSocial' => 'Admin',
            'cpfCnpj' => '00000000000',
            'telefone' => '00000000000',
            'idEndereco' => 1,
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => Bcrypt('123456'),
            'remember_token' => '',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}

 