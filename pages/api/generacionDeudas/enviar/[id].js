import {findAll2,nuevo,update,findOne} from "../../../../config/firebase";
import Ensesion from "../../../../helpers/EnSesion";

export default async function handler(req, res) {
    const { id,campoId,sinUsuario,buscaPorUsuario,limite,pageSize,page } = req.query
    const coleccion="generacionDeudas_items"
    
    const ejecuta=async ({user})=>{
        const wheres=[{campo:"idGeneracionDeuda",valor:id,operador:"=="}]
        const datos=await findAll2({coleccion,user,wheres})
        let deuda=await findOne("generacionDeudas",id)
        const mod=await findOne("mods",deuda.modDeuda)
        const modulo=await findOne("modulos",mod.idModulo)
        
        let idDeudas=[]
        const coleccionDeuda=modulo.coleccionDeuda
        for (let index = 0; index < datos.length; index++){
            const deudaEnviada=await nuevo(coleccionDeuda,{...datos[index],[modulo.idCampoClave]:datos[index].idDestino})
            if(deudaEnviada)idDeudas.push(deudaEnviada.id)
            
        }
            
        
        const deudasEnviadas={coleccion:coleccionDeuda,idDeudas}
        deuda={...deuda,estado:"ENVIADO",deudasEnviadas}
        await update("generacionDeudas",deuda)
        return {}
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })
    res.status(codigoSalida).json(salida)
}