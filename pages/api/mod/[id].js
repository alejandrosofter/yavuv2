import {findAll, findOne} from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const { id } = req.query
    const coleccion="mods"
    
    const [salida,codigoSalida]=await handlerApiABM({id,coleccion,req,res})

    res.status(codigoSalida).json(salida)
}