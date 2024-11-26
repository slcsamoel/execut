<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Fornecedores</title>
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
    <h1>Relatório de Fornecedores</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Razão Social</th>
                <th>Tipo</th>
                <th>Telefone</th>
                <th>Endereço</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($fornecedores as $fornecedor)
                <tr>
                    <td>{{ $fornecedor->id }}</td>
                    <td>{{ $fornecedor->razaoSocial }}</td>
                    <td>{{ $fornecedor->tipo->nomeTipo }}</td>
                    <td>{{ getTelefoneFormatadoAttribute($fornecedor->telefone)}}</td>
                    <td>
                        {{ $fornecedor->endereco->logradouro ?? '' }},
                        {{ $fornecedor->endereco->cidade ?? '' }},
                        {{ $fornecedor->endereco->estado ?? '' }}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
