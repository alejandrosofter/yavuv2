export function getLinkUrl(link,modulo,data,esFuncion)
{
    // if(!data)return "#"
    if(esFuncion)return "#"
    if(!link)return "#"
    return eval("`"+link+"`")
    
}
export function getStringField({obj,field,upper}){
if(!obj)return ""
if(field in obj)return upper?obj[field].toUpperCase():obj[field]
}