import {findOneField, findOne, nuevo, update} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";
export default async function handler(req, res) {
    const { id } = req.query
    const data=req.body
    const ejecuta=async ({user})=>{
        if(!data.id){
            data.idUsuario=user.id
             await nuevo("clubes",data)
        }else{
             await update("clubes",data)
        }
        return {}
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })
 
    res.status(codigoSalida).json(salida)
}