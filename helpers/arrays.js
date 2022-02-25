export function getLabelColeccion({data,valor,campoId,campoLabel})
{
    const i=data.map(x => x[campoId]).indexOf(valor)
    if(i>0)return data[i][campoLabel]
    return "s/n"


}
export function getItemArray({data,valor,campoId})
{
    const i=data.map(x => x[campoId]).indexOf(valor)
    if(i>0)return data[i]
    return null


}
export function getIndexItemArray({data,valor,campoId})
{
    if(data){
        campoId=(campoId)?campoId:"id"
        const i=data.map(x => x[campoId]).indexOf(valor)
    
        if(i>=0)return i
        return null  
    }
    return null


}