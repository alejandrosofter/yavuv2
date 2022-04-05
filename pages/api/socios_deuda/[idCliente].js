import Ensesion from "../../../helpers/EnSesion";
import {findByField} from "../../../config/firebase";
import handlerApiAsociado from "../../../helpers/handlerApiAsociado";

export default async function handler(req, res) {
    const {idCliente, id,campoId,sinUsuario,buscaPorUsuario,limite,pageSize,page,pendientes } = req.query

    res.status(200).json({})
    
    
}