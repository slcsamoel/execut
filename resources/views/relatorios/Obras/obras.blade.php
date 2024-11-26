<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Obras</title>
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
    <h1>Relatório de Obras</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Responsavel</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Endereço</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($obras as $obra)
                <tr>
                    <td>{{ $obra->id }}</td>
                    <td>{{ $obra->nomeObra }}</td>
                    <td>{{ $obra->responsavelObra }}</td>
                    <td>{{ $obra->cliente->nomeCliente }}</td>
                    <td>{{ $obra->tipoObra->nomeTipo }}</td>
                    <td>{{ statusObra($obra->status) }}</td>
                    <td>
                        {{ $obra->endereco->logradouro ?? '' }},
                        {{ $obra->endereco->cidade ?? '' }},
                        {{ $obra->endereco->estado ?? '' }}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
