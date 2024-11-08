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
