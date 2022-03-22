export function formatMoney(number){
    if(!number)return "-"
    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);
    return numberFormat2.format(Number(number))
}
export function formatPorcentual(number){
   
    return `${Number(number).toFixed(2)}%`
}