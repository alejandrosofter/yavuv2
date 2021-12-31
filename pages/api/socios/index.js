import {countCollection, findAll} from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const { id } = req.query
    const coleccion="socios"
    const buscaPorUsuario=true
    const limite=10
    const [salida,codigoSalida]=await handlerApiABM({coleccion,req,res,limite})
  //   const canti=await countCollection(coleccion)
  // console.log(canti)
    res.status(codigoSalida).json(salida)
}