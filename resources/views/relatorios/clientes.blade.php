<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Clientes</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <h1>Relatório de Clientes</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Razão Social</th>
                <th>Telefone</th>
                <th>Endereço</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($clientes as $cliente)
                <tr>
                    <td>{{ $cliente->id }}</td>
                    <td>{{ $cliente->nomeCliente }}</td>
                    <td>{{ $cliente->razaoSocial }}</td>
                    <td>{{ getTelefoneFormatadoAttribute($cliente->telefone) }}</td>
                    <td>
                        {{ $cliente->endereco->logradouro ?? '' }},
                        {{ $cliente->endereco->cidade ?? '' }},
                        {{ $cliente->endereco->estado ?? '' }}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
