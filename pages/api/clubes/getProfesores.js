import {findOneField, findOne} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";
export default async function handler(req, res) {
    const { id } = req.query
    const data=req.body
    const ejecuta=async ({user})=>{
        const club= await findOneField("clubes",{campo:"idUsuario",valor:user.id})
        if(club)return club.profesores
        return []
    }
    let [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })
    console.log(salida)
    res.status(codigoSalida).json(salida)
}