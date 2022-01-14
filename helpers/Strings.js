export function getLinkUrl(link,modulo,data,esFuncion)
{

    // if(!data)return "#"
    if(esFuncion)return "#"
    if(!link)return "#"
    return eval("`"+link+"`")
    
}