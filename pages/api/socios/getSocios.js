import {findAll} from "../../../config/firebase"
import Ensesion from "../../../helpers/EnSesion";
export default async function handler(req, res) {
    const { busca } = req.query
    const data=req.body
    const ejecuta=async ({user})=>{
        // findAll
 
        return {}
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })
    
    res.status(codigoSalida).json(salida)
}