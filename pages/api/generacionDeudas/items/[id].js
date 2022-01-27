import {findAll2,cantidadColeccion2} from "../../../../config/firebase";
import Ensesion from "../../../../helpers/EnSesion";

export default async function handler(req, res) {
    const { id,campoId,sinUsuario,buscaPorUsuario,limite,pageSize,page } = req.query
    const coleccion="generacionDeudas_items"
    
    const ejecuta=async ({user})=>{
        const wheres=[{campo:"idGeneracionDeuda",valor:id,operador:"=="}]
        const datos=await findAll2({wheres,coleccion,user,page,pageSize})
        const cantidadRegistros=await cantidadColeccion2({coleccion,user,wheres})
        return {datos,cantidadRegistros}
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })

    res.status(codigoSalida).json(salida)
}