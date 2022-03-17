import moment from 'moment';
export function getFechaString(fecha,format)
{
    const formato=format?format:'DD/MM/YY'
    
    if(!fecha)return "-"
    if(moment.isDate(fecha))
        return `${moment(new Date(fecha)).format(formato)}`
    if('seconds' in fecha)
        return `${moment(new Date(fecha.seconds * 1000)).format(formato)}`
    if('$date' in fecha)
        return `${moment(new Date(fecha.$date)).format(formato)}`
        
            
}

export function getFechaFormik(fecha)
{
    if(!fecha)return new Date()
    if(moment.isDate(fecha))return new Date(fecha)
    if('seconds' in fecha)return new Date(fecha.seconds * 1000)
    if('$date' in fecha)return new Date(fecha.$date)
    return new Date()
}