import {findAll, findOne} from "../../../config/firebase";
import handlerApiABMbyUser from "../../../helpers/handlerAPIbyUser";
export default async function handler(req, res) {
    const { id } = req.query
    const coleccion="cuentas"
    const [salida,codigoSalida]=await handlerApiABMbyUser({coleccion,req,res})
  
    res.status(codigoSalida).json(salida)
}