import Firestore, { findOne, update,agregar } from "../../../config/firebase"
import {getArrayData} from "../../../config/firebase"
import { getTablas,mfindAll,getCantidadRegistros,getRegistro ,mfindAllPage} from "../../../config/mongodb"
import Ensesion from "../../../helpers/EnSesion"

const getRegistrosUpdate=(data,textoRegistros)=>{
    let salida=[]
    data.map(item=>{
        let registro
        textoRegistros.split(" ").map(itemCampos=>{
            
            itemCampos=itemCampos.trim()
         
            if(itemCampos&&itemCampos!=""){
            
             const [campoDesde,campoHasta]=eval(eval('itemCampos'))
             const valor={[campoHasta?campoHasta:campoDesde]:item[campoDesde]?item[campoDesde]:""}
             registro={...registro,...valor}
            }
         
        })
        salida.push(registro)
    })
    return salida
}
export default async function handler(req, res) {
    const { seleccionDesde,idOrigenDatos,textoRegistros,seleccionHasta,nPagina,cantidadRegistros } = req.body
   

    const ejecuta=async ({user})=>{
    
        let contadores={contadorUpdate:0,contadorCreate:0}
        const od=await findOne("origenesDatos",idOrigenDatos)
        
        const moduloHasta=await findOne("modulos",seleccionHasta)
      
        if(moduloHasta){
          const desdeRegistro=nPagina*cantidadRegistros
            const data= await mfindAllPage(od,seleccionDesde,desdeRegistro,cantidadRegistros)
        
            const registros=await getRegistrosUpdate(data,textoRegistros)
      
            for (let index = 0; index < registros.length; index++) {
                const item = registros[index];
                const itemDb=await findOne(moduloHasta.coleccion,item.id)
                

                if(itemDb){
                    const res=await update(moduloHasta.coleccion,item,user)
                   
                    contadores.contadorUpdate++
              
                }
                else {
                    const res=await agregar(moduloHasta.coleccion,item,user)
                    contadores.contadorCreate++
            
                }
                
            }
            
           
        }
        return contadores
       
       
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    }) 
    res.status(codigoSalida).json(salida)
    
   
}