export function getLabelColeccion({data,valor,campoId,campoLabel})
{
    const i=data.map(x => x[campoId]).indexOf(valor)
    if(i>0)return data[i][campoLabel]
    return "s/n"


}
export function getItemArray({data,valor,campoId})
{
    if(data){
        campoId=(campoId)?campoId:"id"
        const i=data.map(x => x[campoId]).indexOf(valor)
    
        if(i>=0)return data[i]
        return null  
    }
    return null


}
export function getItemArrayKey({data,key})
{
    let aux
        data.forEach((item, keyObj, map)=>{

            if (keyObj===key) aux= item
        })

        
    return aux
}
export function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
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