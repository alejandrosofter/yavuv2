import Firestore, { findOne } from "../../../../config/firebase"
import {getArrayData,findAll} from "../../../../config/firebase"
import { getTablas,getRegistro } from "../../../../config/mongodb"
import Ensesion from "../../../../helpers/EnSesion"
export default async function handler(req, res) {
    const { idOrigenDatos,seleccion,pk,pkRegistro } = req.query
    const data=req.body

    const ejecuta=async ({user})=>{
       
       const origen=await findOne("origenesDatos",idOrigenDatos)
       const tablas=await getRegistro(origen,seleccion,pk,pkRegistro)
       
       return {"key":"root","tipo":"array","registro":tablas}
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })

    res.status(200).json(salida)
    
   
}