import {
  findOne,
  update,
  nuevo,
  findAll,
  findOneField,
  remove,
} from "../config/firebase";
import Ensesion from "./EnSesion";

export default async function handlerApiABMbyUser({ req, res, coleccion }) {
  let ejecuta;
  switch (req.method) {
    case "POST":
      ejecuta = async ({ user }) => {
        var sal = {};
        let data = req.body;

        data.idUsuario = user.id;
        if (req.body.id) sal = await update(coleccion, data);
        else sal = await nuevo(coleccion, data);

        if (!sal) return {};
        else return sal;
      };
      break;
    case "GET":
      ejecuta = async ({ user }) => {
        let salida;

        const res = await findOneField(coleccion, {
          campo: "idUsuario",
          valor: user.id,
        });

        return res;
      };
      break;
    case "DELETE":
      ejecuta = async ({ user }) => {
        remove(coleccion, { idUsuario: user.id });
      };
      break;
    default:
  }

  return await Ensesion({ req, res, ejecuta }).catch((err) => {
    throw err;
  });
}
