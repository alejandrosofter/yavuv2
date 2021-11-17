export function getLinkUrl(link,modulo,data,esFuncion)
{
    if(esFuncion)return "#"
    if(!link)return "#"
    return eval("`"+link+"`")
    
}