import {findAll} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";
export default async function handler(req, res) {
    const { id } = req.query
    const data=req.body
    const ejecuta=async ({user})=>{
        return await findAll("planes",user,true)
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })

    res.status(codigoSalida).json(salida)
}