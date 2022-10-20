import numeros_a_letras from "numeros_a_letras";
export function formatMoney(number, symbol) {
  const simb = symbol ? symbol : "$";
  if (!number) return `${simb}0.00`;
  const options2 = { style: "currency", currency: "USD" };
  const numberFormat2 = new Intl.NumberFormat("en-US", options2);
  return numberFormat2.format(Number(number));
}
export function formatPorcentual(number, decimal = 2) {
  if (isNaN(number)) return "0%";
  return `${Number(number).toFixed(decimal)}%`;
}
export function numeroLetra(numero) {
  if (!numero) return "-";
  return numeros_a_letras(numero);
}
