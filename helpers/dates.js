import moment from 'moment';
export function getFechaString(fecha,format)
{
    const formato=format?format:'DD/MM/YY'
    console.log
    if(!fecha)return "-"
    if(moment.isDate(fecha))
        return `${moment(new Date(fecha)).format(formato)}`
    if('seconds' in fecha)
        return `${moment(new Date(fecha.seconds * 1000)).format(formato)}`
    
        
            
}