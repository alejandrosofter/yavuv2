import { findAll, findOne } from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
  const { id, coleccion, campoId, sinUsuario, buscaPorUsuario, limite } =
    req.query;

  const [salida, codigoSalida] = await handlerApiABM({
    id,
    req,
    res,
    coleccion,
    campoId,
    sinUsuario,
    buscaPorUsuario,
    limite,
  });

  res.status(codigoSalida).json(salida);
}
