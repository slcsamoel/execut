/**
 *  Formatar Campo texto para Numerico
 */
export function formatarCampoTextParaNumerico(input) {
    // Remove todos os caracteres não numéricos
    var valor = input.target.value.replace(/\D/g, '');
    // Atualiza o valor do campo
    input.target.value = valor;
}


/**
 * Formatar data no formato DD/MM/AAAA
 */
export function formatDate(date) {
    if (!date) return '';
    const [year, month, day] = date.split(' ')[0].split('-');
    return `${day}/${month}/${year}`;
};

/**
 * formatar campos  para valores financeiros
 *
 */
export function formatCurrency(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); // Remove todos os caracteres que não são números
      // Permite que o valor "0" seja exibido no início
    if (value === "") return "";

    // Formata o valor como moeda com duas casas decimais
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const result = (parseFloat(value) / 100).toLocaleString("pt-BR", options);

    return result;
}

/**
 * Formatar valor financeiros para salvar
 *
 *
 */
export function convertCurrencyToNumber(value) {
    if (!value) return 0;
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
}


/**
 * Formatar data no formato DD/MM/AAAA HH:MM
 */
export function formatDateWithTime(date) {
    if (!date) return '';
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return `${day}/${month}/${year} ${hour}:${minute}`;
};

/**
 * Formatar data ISO no formato DD/MM/AAAA HH:MM
 */
export function formatISODateWithTime(date) {
    if (!date || typeof date !== 'string') return '';
    const [datePart, timePart] = date.includes('T') ? date.split('T') : date.split(' ');
    if (!datePart || !timePart) return '';
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    if (!year || !month || !day || !hour || !minute) return '';
    return `${day}/${month}/${year} ${hour}:${minute}`;
};

/**
 * Status Obra
*/
export function checkStatusObra(status){
    if (status === 1) {
        return "Em andamento";
    } else if (status === 2) {
        return "Pausada";
    }else if (status === 3){
        return "Cancelada";
    }else if (status === 4){
        return "Concluída";
    }
}

/**
 * Validar Status Obra
*/
export function validarStatusObra(status){
    if (status === 1) {
        return true;
    } else if (status === 2) {
        return true;
    }else if (status === 3){
        return false;
    }else if (status === 4){
        return false;
    }
}

/**
 * Formatar campos
 */

export function formatCpfCnpj(value) {
    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    if (value.length <= 11) {
        // Formata como CPF: 000.000.000-00
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, p1, p2, p3, p4) =>
            [p1, p2, p3, p4].filter(Boolean).join(".").replace(/\.(\d{3})\.(\d{3})$/, "-$1")
        );
    } else {
        // Formata como CNPJ: 00.000.000/0000-00
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (_, p1, p2, p3, p4, p5) =>
            [p1, p2, p3, p4, p5].filter(Boolean).join(".").replace(/\.(\d{3})\.(\d{4})\./, "/").replace(/\.(\d{4})\/$/, "-$1")
        );
    }
}

/**
 * mask cpfCNPJ
 */

export function maskCpfCnpj(value) {
     // Verifica se o valor é undefined ou null e se não, converte para string
     if (!value) return ""; // Retorna uma string vazia caso o valor seja inválido (null, undefined)

     value = String(value).replace(/\D/g, ""); // Remove tudo que não for número

     if (value.length > 14) value = value.slice(0, 14); // Limita a 14 dígitos (máximo para CNPJ)

     if (value.length <= 11) {
         return value
             .replace(/^(\d{3})(\d)/, "$1.$2")
             .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
             .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
     } else {
         return value
             .replace(/^(\d{2})(\d)/, "$1.$2")
             .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
             .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
             .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
     }
}

/**
 * mask phone
 */

export function maskPhone(value) {
    if (!value) return ""; // Retorna vazio se não houver valor

    value = String(value).replace(/\D/g, ""); // Remove tudo que não é número
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length === 0) return ""; // Se o valor for apagado, retorna vazio
    if (value.length <= 2) return `(${value}`; // Adiciona apenas o parêntese inicial

    if (value.length <= 10) {
        // Telefone fixo: (99) 9999-9999
        return value.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_, p1, p2, p3) =>
            `(${p1}) ${p2}${p3 ? `-${p3}` : ""}`
        );
    } else {
        // Celular: (99) 9 9999-9999
        return value.replace(/(\d{2})(\d{1})(\d{0,4})(\d{0,4})/, (_, p1, p2, p3, p4) =>
            `(${p1}) ${p2} ${p3}${p4 ? `-${p4}` : ""}`
        );
    }
}

/**
 * mask money
 */

export function maskMoney(value) {
    if (value == null || value === "") return ""; // Trata valores nulos ou vazios

    // Remove tudo que não for número ou ponto/vírgula
    let numericValue = String(value).replace(/[^\d.,]/g, "");

    // Substitui vírgula por ponto (para tratar corretamente como número)
    numericValue = numericValue.replace(",", ".");

    // Verifica se é um número válido
    if (isNaN(Number(numericValue))) return "";

    // Formata o número como moeda BR
    const formattedValue = Number(numericValue).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedValue;
}

export function maskMoneyInput(value) {
    if (value == null || value === "") return ""; // Trata valores nulos ou vazios

    // Remove todos os caracteres que não são dígitos
    let numericValue = String(value).replace(/\D/g, "");

    // Adiciona os centavos automaticamente
    if (numericValue.length === 1) {
        numericValue = "0" + numericValue; // Exemplo: "8" vira "08"
    } else if (numericValue.length === 2) {
        numericValue = "0" + numericValue; // Exemplo: "80" vira "080"
    }

    // Divide em reais e centavos
    const reais = numericValue.slice(0, -2); // Parte inteira
    const centavos = numericValue.slice(-2); // Últimos dois dígitos

    // Formata o valor como moeda brasileira
    const formattedValue = `${parseInt(reais, 10).toLocaleString("pt-BR")},${centavos}`;

    return formattedValue;
}




export function maskCnpj(value) {
    if (!value) return ""; // Retorna vazio se o valor for inválido

    value = String(value).replace(/\D/g, ""); // Remove tudo que não for número

    if (value.length > 14) value = value.slice(0, 14); // Limita a 14 dígitos (máximo para CNPJ)

    // Aplica a máscara do CNPJ: 00.000.000/0000-00
    return value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
}
