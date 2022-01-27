import Ensesion from "../../../helpers/EnSesion";
import {findAll, findOne} from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const { id,campoId,sinUsuario,buscaPorUsuario,limite,pageSize,page } = req.query
    const coleccion="generacionDeudas"
    const callbackCreate=async (item)=>{  
        const res = await item.get()
        const data = res.data()

    }
    const [salida,codigoSalida]=await handlerApiABM({callbackCreate,pageSize,page,id,req, res,coleccion,campoId,sinUsuario,buscaPorUsuario,limite})

    res.status(codigoSalida).json(salida)
}