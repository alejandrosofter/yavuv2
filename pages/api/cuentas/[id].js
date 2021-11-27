import {findAll, findOne, findOneField} from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const { id } = req.query
    const coleccion="cuentas"
    const campoId="idUsuario"
   const datos=await handlerApiABM({req,res,coleccion,campoId})
    if(!datos) res.status(200).json({})
    else res.status(200).json(datos)
}