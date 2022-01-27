import { remove,findAll2,update,findOne } from "../../../../config/firebase";
import { getIndexItemArray } from "../../../../helpers/arrays";
import Ensesion from "../../../../helpers/EnSesion";
export default async function handler(req, res) {
    const { id,campoId,sinUsuario,buscaPorUsuario,limite,pageSize,page } = req.query
    const coleccion="generacionDeudas_items"
    const ejecuta=async ({user})=>{
        const wheres=[{campo:"idGeneracionDeuda",valor:id,operador:"=="}]
        const datos=await findAll2({coleccion,user,wheres})
        let deuda=await findOne("generacionDeudas",id)
        deuda.estado="PENDIENTE"
        for (let index = 0; index < datos.length; index++) 
            await remove(coleccion,datos[index])
        await update("generacionDeudas",deuda)
        return {}
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })

    res.status(codigoSalida).json(salida)
}