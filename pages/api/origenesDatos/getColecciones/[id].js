import Firestore, { findOne } from "../../../../config/firebase"
import {getArrayData,findAll} from "../../../../config/firebase"
import { getTablas } from "../../../../config/mongodb"
import Ensesion from "../../../../helpers/EnSesion"
export default async function handler(req, res) {
    const { id } = req.query
    const data=req.body
   
    const ejecuta=async ({user})=>{
       
       const origen=await findOne("origenesDatos",id)
       const tablas=await getTablas(origen)
       
       return tablas
    }
    // const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
    //     throw err
    // })

    const salida=await ejecuta({})
    res.status(200).json(salida)
    
   
}