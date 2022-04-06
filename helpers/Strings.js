export function getLinkUrl(link,modulo,data,esFuncion)
{
    try{
if(esFuncion)return "#"
if(!link)return "#"
return eval("`"+link+"`")
    }catch(err){
        console.error("erro creacion link menu",modulo)
        return ""
    }
    
    
}
export function getStringField({obj,field,upper}){
if(!obj)return ""
if(field in obj)return upper?obj[field].toUpperCase():obj[field]
}
export function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}