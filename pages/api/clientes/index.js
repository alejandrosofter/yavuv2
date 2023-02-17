import Ensesion from "../../../helpers/EnSesion";
import { findAll, findOne } from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
  const {
    id,
    campoId,
    sinUsuario,
    buscaPorUsuario,
    limite,
    pageSize,
    page,
    busca,
  } = req.query;
  const coleccion = "clientes";

  const orderBy = "apellido";
  let wheres = [];
  if (busca) wheres.push({ campo: "apellido", valor: busca, operador: "==" });
  const callbackCreate = async (item) => {};
  const [salida, codigoSalida] = await handlerApiABM({
    wheres,
    orderBy,
    callbackCreate,
    pageSize,
    page,
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
