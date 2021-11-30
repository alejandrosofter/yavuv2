export default function getLabelColeccion({data,valor,campoId,campoLabel})
{
    const i=data.map(x => x[campoId]).indexOf(valor)
    if(i>0)return data[i][campoLabel]
    return "s/n"


}