import { findOneField, findOne, update, nuevo } from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";
import randomId from "random-id";

export default async function handler(req, res) {
  const { coleccion, subColeccion, idRegistroPadre, idMod } = req.query;
  const data = req.body;

  const ejecuta = async ({ user }) => {
    data.idUsuario = user.id;

    let registroPrincipal = await findOneField(coleccion, {
      campo: "id",
      valor: data.idRegistroPadre,
    });

    if (!data.id && !data._id) {
      //ES NUEVO
      data.id = randomId(20);

      if (!registroPrincipal[subColeccion])
        registroPrincipal[subColeccion] = [data];
      else registroPrincipal[subColeccion].push(data);

      await update(coleccion, registroPrincipal);
    }
    if (data.id) {
      //ES update
      const i = registroPrincipal[subColeccion]
        .map((item) => (item.id ? item.id : item._id))
        .indexOf(data.id ? data.id : data._id);
      if (!data.id) data.id = data._id; //SETEO EN CASO DE QUE NO HAYA ID (_ID se pone en ID)
      registroPrincipal[subColeccion][i] = data;
      await update(coleccion, registroPrincipal);
    }
    if (req.method == "DELETE") {
      const i = registroPrincipal[subColeccion]
        .map((item) => (item.id ? item.id : item._id))
        .indexOf(data.id ? data.id : data._id);
      registroPrincipal[subColeccion].splice(i, 1);
      registroPrincipal[subColeccion] = registroPrincipal[subColeccion];

      await update(coleccion, registroPrincipal);
    }

    return {};
  };
  const [salida, codigoSalida] = await Ensesion({ req, res, ejecuta }).catch(
    (err) => {
      throw err;
    }
  );

  res.status(codigoSalida).json(salida);
}
