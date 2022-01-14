import {findAll, findOne} from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const {  id,campoId,sinUsuario,buscaPorUsuario,limite } = req.query
    const coleccion="socios"
    // console.log(req.headers.authorization);
    const [salida,codigoSalida]=await handlerApiABM({id,coleccion,req, res,campoId,sinUsuario,buscaPorUsuario,limite})

    res.status(codigoSalida).json(salida)
}