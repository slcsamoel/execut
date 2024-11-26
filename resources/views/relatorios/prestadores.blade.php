<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Prestadores</title>
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
    <h1>Relatório de Prestadores</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Função</th>
                <th>Telefone</th>
                <th>Diaria</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($prestadores as $prestador)
                <tr>
                    <td>{{ $prestador->id }}</td>
                    <td>{{ $prestador->nomePrestador }}</td>
                    <td>{{ $prestador->funcao->nomeFuncao }}</td>
                    <td>{{ getTelefoneFormatadoAttribute($prestador->telefone)}}</td>
                    <td>{{ maskMoney($prestador->valorDiaria) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
