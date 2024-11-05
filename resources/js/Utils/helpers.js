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
