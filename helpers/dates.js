import moment from 'moment';
export function getFechaString(fecha,format)
{
    const formato=format?format:'DD/MM/YY'
    if(!fecha)return "-"
    if(moment.isDate(fecha))
        return <i>{`${moment(new Date(fecha)).format(formato)}`}</i>
    if('seconds' in fecha)
        return <i>{`${moment(new Date(fecha.seconds * 1000)).format(formato)}`}</i>
            
}