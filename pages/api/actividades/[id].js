import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const {  id,campoId,sinUsuario,buscaPorUsuario,limite } = req.query
    const coleccion="actividades"

    const [salida,codigoSalida]=await handlerApiABM({id,coleccion,req, res,campoId,sinUsuario,buscaPorUsuario,limite})

    res.status(codigoSalida).json(salida)
}