import {
  findOneField,
  updateArrayField,
  findOne,
  update,
  nuevo,
} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";
import randomId from "random-id";
import { getItemArray } from "../../../helpers/arrays";

const quitarArr = ({ arr, valor, campoId }) => {
  const i = arr.map((item) => item[campoId]).indexOf(valor);
  return arr.filter(function (item) {
    return item[campoId] !== valor;
  });
};
const agregarArr = ({ arr, valor, campoId }) => {
  if (arr.map((item) => item[campoId]).indexOf(valor[campoId]) === -1)
    arr.push(valor);
  return arr;
};

const fncallback = async (req) => {
  const { subColeccion, idRegistroPadre, label } = req.query;
  const data = req.body;

  const esDelete = req.method == "DELETE" || data.estado !== "ACTIVO";
  const fn = {
    actividades: async (data, esDelete) => {
      const actividad = await findOne(
        subColeccion,
        data.idActividad ? data.idActividad : data.id.idActividad
      );

      const periodos = actividad.periodos ? actividad.periodos : [];

      const indexPeriodo = periodos
        .map((item) => item.id)
        .indexOf(data.idPeriodo ? data.idPeriodo : data.id.idPeriodo);
      let periodoAux = periodos[indexPeriodo];

      if (periodoAux) {
        let sociosPeriodo = periodoAux.socios ? periodoAux.socios : [];
        if (esDelete)
          sociosPeriodo = quitarArr({
            arr: sociosPeriodo,
            valor: idRegistroPadre,
            campoId: "id",
          });
        else
          sociosPeriodo = agregarArr({
            campoId: "id",
            arr: sociosPeriodo,
            valor: {
              id: idRegistroPadre,
              nombre: label,
              idActividad: data.idActividad,
              idSubActividad: data.idSubActividad,
            },
          });
        periodoAux.socios = sociosPeriodo;
        periodos[indexPeriodo] = periodoAux;

        actividad.periodos = periodos;

        await update(subColeccion, actividad);
      }
    },
  };
  if (subColeccion === "actividades") fn.actividades(data, esDelete);
};
export default async function handler(req, res) {
  const { subColeccion, idRegistroPadre, label } = req.query;
  const data = req.body;
  const coleccion = "socios";

  const ejecuta = async ({ user }) => {
    data.idUsuario = user.id;

    let registroPrincipal = await findOneField(coleccion, {
      campo: "id",
      valor: data.idRegistroPadre,
    });

    if (!data.id) {
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
    await fncallback(req, coleccion);

    return {};
  };
  const [salida, codigoSalida] = await Ensesion({ req, res, ejecuta }).catch(
    (err) => {
      throw err;
    }
  );

  res.status(codigoSalida).json(salida);
}
