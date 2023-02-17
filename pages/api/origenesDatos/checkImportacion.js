import Firestore, { findOne } from "../../../config/firebase";
import { getArrayData, findAll } from "../../../config/firebase";
import {
  getTablas,
  mfindAll,
  getCantidadRegistros,
  getRegistro,
} from "../../../config/mongodb";
import Ensesion from "../../../helpers/EnSesion";
const getRegistrosUpdate = (data, textoRegistros) => {
  let salida = [];
  data.map((item) => {
    let registro;
    textoRegistros.split(" ").map((itemCampos) => {
      itemCampos = itemCampos.trim();

      if (itemCampos && itemCampos != "") {
        //
        const [campoDesde, campoHasta] = eval(eval("itemCampos"));
        const valor = { [campoHasta]: item[campoDesde] };
        registro = { ...registro, ...valor };
      }
    });
    salida.push(registro);
  });
  return salida;
};
export default async function handler(req, res) {
  const {
    seleccionDesde,
    idOrigenDatos,
    textoRegistros,
    seleccionHasta,
    pkDesde,
    pkHasta,
  } = req.body;

  const ejecuta = async ({ user }) => {
    const od = await findOne("origenesDatos", idOrigenDatos);
    const data = await mfindAll(od, seleccionDesde);
    const cant = await getCantidadRegistros(od, seleccionDesde);
    //    const registros=getRegistrosUpdate(data,textoRegistros)
    return { cantidadDatos: cant, registros: [] };
  };
  const [salida, codigoSalida] = await Ensesion({ req, res, ejecuta }).catch(
    (err) => {
      throw err;
    }
  );

  res.status(codigoSalida).json(salida);
}
