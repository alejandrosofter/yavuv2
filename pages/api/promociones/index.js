import Ensesion from "../../../helpers/EnSesion";
import {findAll, findOne} from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const { id,campoId,sinUsuario,buscaPorUsuario,limite,pageSize,page } = req.query
    const coleccion="promociones"
    const orderBy="fechaVto"
    const callbackCreate=async (item)=>{  
        
    }
    const [salida,codigoSalida]=await handlerApiABM({orderBy,callbackCreate,pageSize,page,id,req, res,coleccion,campoId,sinUsuario,buscaPorUsuario,limite})

    res.status(codigoSalida).json(salida)
}