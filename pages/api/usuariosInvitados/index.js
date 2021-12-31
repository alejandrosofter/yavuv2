import {findAll} from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const { id } = req.query
    const coleccion="usuariosInvitados"
    const [salida,codigoSalida]=await handlerApiABM({coleccion,req,res})
  
    res.status(codigoSalida).json(salida)
}