<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Força quebra de página antes ou depois de um elemento */
      .page-break {
          page-break-before: always; /* ou: page-break-after: always; */
      }

      /* Ajusta o tamanho da fonte e margens no relatório para impressão */
      body {
          font-family: Arial, sans-serif;
          font-size: 12px;
      }

      .table {
          width: 100%;
          border-collapse: collapse;
      }

      .table th, .table td {
          border: 1px solid #ddd;
          padding: 8px;
      }

      .table th {
          text-align: left;
      }

      h1, h5 , h4 {
          margin: 0;
          padding-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <div>
      <div class="card shadow-lg mx-4 my-3">
        <div class="card-body p-3">
          <h1>Relatório Obra - {{ $obra->nomeObra }}</h1>
        </div>
      </div>

      <div class="container-fluid py-4">
        <!-- Informações da Obra -->
        <div class="row">
          <div class="col-md-12">
            <h4>Informações da Obra</h4>
            <p><h5>{{ $obra->nomeObra }}</h5></p>
            <p><h5>{{ $obra->endereco->logradouro ?? '' }}, {{ $obra->endereco->cidade ?? '' }} - {{ $obra->endereco->estado ?? '' }}</h5></p>
            <p>Cliente: <h5>{{ $obra->cliente->nomeCliente }} - {{ getTelefoneFormatadoAttribute($obra->cliente->telefone) }}</h5></p>
            <p>Status: <h5>{{ statusObra($obra->status) }}</h5></p>
            <p>Responsável: <h5>{{ $obra->responsavelObra }}</h5></p>
            <p>Total de Materiais: <h5>{{ maskMoney($valorMateria) }}</h5></p>
            <p>Total de Mão de Obra: <h5>{{ maskMoney($valorPrestador) }}</h5></p>
            <p>Orçamento: <h5>{{ maskMoney($obra->valorOrcamento) }}</h5></p>
            @if($obra->valorFinal)
              <p>Valor Final da Obra: <h5>{{ maskMoney($obra->valorFinal) }}</h5></p>
            @else
              <p>Valor Parcial da Obra:<h5> {{ maskMoney($valorObra) }} </h5></p>
            @endif
          </div>
        </div>

        <!-- Quebra de página antes dos Prestadores -->
        <div class="page-break"></div>
        <h5>Prestadores da Obra</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Dias Trabalhados</th>
              <th>Total de Valor</th>
            </tr>
          </thead>
          <tbody>
            @foreach($prestadores as $prestadorObra)
              <tr>
                <td>{{ $prestadorObra->prestador->nomePrestador }}</td>
                <td>{{ $prestadorObra->prestador->funcao->nomeFuncao }}</td>
                <td>{{ $prestadorObra->diasTrabalhados }}</td>
                <td>{{ maskMoney($prestadorObra->valorTotalTrabalhado) }}</td>
              </tr>
            @endforeach
          </tbody>
        </table>

        <!-- Quebra de página antes dos Materiais -->
        <div class="page-break"></div>
        <h5>Materiais da Obra</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Fornecedor</th>
              <th>Data da Compra</th>
              <th>Total de Valor</th>
            </tr>
          </thead>
          <tbody>
            @foreach($materias as $material)
              <tr>
                <td>{{ $material->nomeMaterial }}</td>
                <td>{{ $material->fornecedor->razaoSocial }}</td>
                <td>{{ \Carbon\Carbon::parse($material->dataCompra)->format('d/m/Y H:i') }}</td>
                <td>{{ maskMoney($material->valor) }}</td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>
