import Firestore from "../../../../config/firebase";
export default async function handler(req, res) {
    const { id } = req.query
    const refImportacion=await Firestore().collection("importaciones").doc(id).get()
    
    const url=`https://us-central1-yavu-98cac.cloudfunctions.net/importaciones_iniciar?id=${id}`
    fetch(url)
    .then(async response => {
        const {dataInit}=await response.json()
        const {totalImportados,totalPostProcesa}=await ingresarLotes({dataInit,id,refImportacion})
        await Firestore().collection("importaciones").doc(id).update({importados:totalImportados,totalPostProcesa})
        console.log(JSON.stringify(totalImportados) )
        res.status(200).json(totalImportados)
    })
    .catch(error => console.error('Error:', error))

    
}
const postProcesamiento=(url,arrIds)=>{
    let promises=[]
    for (let i = 0; i < arrIds.length; i++) 
        promises.push( fetch(`${url}?id=${arrIds[i]}`) )
    return Promise.all(promises)
    
}
const ingresarLotes=async ({id,refImportacion,dataInit})=>{
    const SIZE_LOTE=10
    
    const cantidadLotes=Math.ceil(dataInit.cantidadRegistros/SIZE_LOTE)
    let desde=0
    let hasta=SIZE_LOTE

    let totalImportados=0
    let totalPostProcesa=0
    for(let i=0;i<cantidadLotes;i++){
        const url=`https://us-central1-yavu-98cac.cloudfunctions.net/importaciones_cargar?id=${id}&desde=${desde}&hasta=${hasta}`
        const result=await fetch(url)
        .then(async dataImporta => {
            const result=await dataImporta.json()
         
            const resultadoPost=refImportacion.data().postProcesamiento?
                await postProcesamiento(refImportacion.data().urlPostProcesamiento,result?.arrIds):{}
            
            return {...result,resultadoPost}
        })  
        .catch(error => {
            console.error(error)
        })
        totalPostProcesa+=result?.resultadoPost?
        result.resultadoPost.map(item=>item.timeout===0?1:0).reduce((a,b)=>a+b):0
        totalImportados+=result?.importados?result.importados:0
        desde=hasta
        hasta=hasta+SIZE_LOTE
        console.log(`${desde}/${hasta}`)
        await Firestore().collection("importaciones").doc(id).update({pagina:i,cantidadPorPagina:SIZE_LOTE, estadoParcial:`${desde}/${hasta}`, importados:totalImportados,totalPostProcesa})
    }
    return {totalImportados,totalPostProcesa}
}