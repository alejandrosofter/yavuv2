import {findOneField, findOne} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";
export default async function handler(req, res) {
    const { id } = req.query
    const data=req.body
    const ejecuta=async ({user})=>{
        return await findOneField("clubes",{campo:"idUsuario",valor:user.id})
    }
    let [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })
    if(!salida)salida={esNuevo:true}

    res.status(codigoSalida).json(salida)
}