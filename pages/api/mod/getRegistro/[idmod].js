import { findOne,getRegistro } from "../../../../config/firebase"
import Ensesion from "../../../../helpers/EnSesion"

export default async function handler(req, res) {
    const { idmod,pkRegistroMod } = req.query
    
    const ejecuta=async ({user})=>{
        const mod= await findOne("mods",idmod)
        
        const modulo= await findOne("modulos",mod.idModulo)
        
        const tablas= await getRegistro(modulo.coleccion,pkRegistroMod)
        return {"key":"root","tipo":"array","registro":tablas}
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })

    res.status(codigoSalida).json(salida)
}