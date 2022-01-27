import Ensesion from "../../../helpers/EnSesion";
import {findAll, findOne} from "../../../config/firebase";
import handlerApiAsociado from "../../../helpers/handlerApiAsociado";
export default async function handler(req, res) {
    const {idSocio, id,campoId,sinUsuario,buscaPorUsuario,limite,pageSize,page } = req.query
    const coleccion="socios_deuda"
    const orderBy="fechaVto"
    const wheres=[{campo:"idSocio",valor:idSocio,operador:"=="}]
    const [salida,codigoSalida]=await handlerApiAsociado({sinUsuario:true,orderBy,wheres,pageSize,page,id,req, res,coleccion,campoId,sinUsuario,buscaPorUsuario,limite})
   
    res.status(codigoSalida).json(salida)
}