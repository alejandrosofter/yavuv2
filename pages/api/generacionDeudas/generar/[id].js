import {
  findOne,
  findAll2,
  update,
  getWhereCadena,
  nuevo,
} from "../../../../config/firebase";
import { getIndexItemArray } from "../../../../helpers/arrays";
import Ensesion from "../../../../helpers/EnSesion";
import { getEdad } from "../../../../helpers/fechas";
const getItemsPromocion = (promocion, importeDebe, concepto) => {
  let salida = [];
  const items = promocion.items;
  const infoPromo = {
    nombrePromocion: promocion.nombrePromocion,
    idPromocion: promocion.id,
    fechaVtoPromocion: promocion.fechaVto,
  };
  items.map((item) => {
    if (concepto === item.concepto) {
      const importeBonificacionPorcentaje =
        importeDebe * (Number(item.porcentaje) / 100);
      const importeBonificacionImporte = Number(item.importe);
      const importeBonificacion =
        importeBonificacionPorcentaje + importeBonificacionImporte;
      salida.push({
        ...item,
        ...infoPromo,
        importeBonificacion,
        importeBonificacionPorcentaje,
        importeBonificacionImporte,
      });
    }
  });
  return salida;
};
const getPromociones = async (promociones, importe, concepto) => {
  let salida = [];
  for (let index = 0; index < promociones.length; index++) {
    const promoSocio = promociones[index];

    if (promoSocio.estado === "ACTIVO") {
      const promocion = await findOne("promociones", promoSocio.idPromocion);

      if (promocion && promocion.estado === "ACTIVO")
        salida = salida.concat(getItemsPromocion(promocion, importe, concepto));
    }
  }

  return salida;
};
const getImporteSubActividad = (elemento, elementoItera) => {
  const item = getIndexItemArray({
    data: elemento.subActividades,
    valor: elementoItera.idSubActividad,
  });
  if (item) return item.importe;
  return 0;
};
const getSubActividad = (elemento, elementoItera, campo) => {
  const item = getIndexItemArray({
    data: elemento.subActividades,
    valor: elementoItera.idSubActividad,
  });

  if (item) return item[campo];
  return 0;
};
async function generaDeuda({
  coleccion,
  elementoItera,
  fnImporte,
  fnLabelElemento,
  fnDetalleExtra,
  mod,
  elemento,
  deuda,
  promociones,
  user,
}) {
  const idGeneracionDeuda = deuda.id;
  const idElemento = elemento.id;

  let importe = fnImporte
    ? Number(
        fnImporte({ getEdad, config: mod.config, elemento, elementoItera })
      )
    : 0;
  importe = isNaN(importe) ? 0 : importe;
  const label_elemento = fnLabelElemento
    ? fnLabelElemento({ getEdad, config: mod.config, elemento, elementoItera })
    : "";
  const detalleExtra = fnDetalleExtra
    ? fnDetalleExtra({
        getEdad,
        config: mod.config,
        elemento,
        elementoItera,
      }).toUpperCase()
    : "";
  const idDestino = coleccion == "actividades" ? elementoItera.id : elemento.id;
  const promocionesAplicadas = await getPromociones(
    promociones ? promociones : [],
    importe,
    deuda.concepto
  );
  const importeBonificacion = promocionesAplicadas
    .map((item) => item.importeBonificacion)
    .reduce((a, b) => a + b, 0);

  const itemDeuda = {
    promocionesAplicadas,
    importeBonificacion,
    label_elemento,
    idElemento,
    idUsuario: user.id,
    idGeneracionDeuda,
    concepto: deuda.concepto,
    label_concepto: deuda.label_concepto,
    detalleExtra,
    idDestino,
    detalle: deuda.detalle,
    importe,
    fecha: deuda.fecha,
    fechaVto: deuda.fechaVto,
    estado: "PENDIENTE",
  };

  await nuevo("generacionDeudas_items", itemDeuda);
  return itemDeuda;
}
const itera = async (arr, fn) => {
  if (Array.isArray(arr)) return await arr.map(async (item) => await fn(item));
};
const calulcarDeudaSocios = async ({
  coleccion,
  user,
  fnImporte,
  fnLabelElemento,
  fnDetalleExtra,
  mod,
  elemento,
  deuda,
}) => {
  const res = await generaDeuda({
    coleccion,
    user,
    fnImporte,
    fnLabelElemento,
    fnDetalleExtra,
    mod,
    elemento,
    promociones: elemento.promociones,
    deuda,
  });
  return {
    cantidad: 1,
    importe: res.importe,
    importeBonificacion: res.importeBonificacion,
  };
};
const calulcarDeudaActividades = async ({
  coleccion,
  user,
  fnImporte,
  fnLabelElemento,
  fnDetalleExtra,
  mod,
  elemento,
  deuda,
}) => {
  let salida = { cantidad: 0, importe: 0, importeBonificacion: 0 };
  for (let index = 0; index < elemento.periodos.length; index++) {
    const periodo = elemento.periodos[index];
    if (periodo.estado === "ACTIVA") {
      for (let i = 0; i < periodo.socios.length; i++) {
        const itemPeriodoSocio = periodo.socios[i];
        const socio = await findOne("socios", itemPeriodoSocio.id);
        const res = await generaDeuda({
          promociones: socio.promociones,
          coleccion,
          user,
          fnImporte,
          fnLabelElemento,
          fnDetalleExtra,
          mod,
          elemento,
          elementoItera: itemPeriodoSocio,
          deuda,
        });
        salida.importe += res.importe;
        salida.importeBonificacion += res.importeBonificacion;
        salida.cantidad += 1;
      }
    }
  }

  return salida;
};
export default async function handler(req, res) {
  const ejecuta = async ({ user }) => {
    const idGeneracionDeuda = req.query.id;
    let deuda = await findOne("generacionDeudas", idGeneracionDeuda);
    const mod = await findOne("mods", deuda.modDeuda);
    const modulo = await findOne("modulos", mod.idModulo);
    const wheres = [getWhereCadena(deuda.conjunto)];
    const coleccion = modulo.coleccion; //<===== esta sera mi referencia para calcular de una y otra manera

    const fnImporte = deuda.calculoImporte ? eval(deuda.calculoImporte) : null;
    const fnDetalleExtra = deuda.fnDetalleExtra
      ? eval(deuda.fnDetalleExtra)
      : null;
    const fnLabelElemento = deuda.fnLabelElemento
      ? eval(deuda.fnLabelElemento)
      : null;

    let contadoresTotal = {
      importeTotal: 0,
      importeTotalBonificaciones: 0,
      cantidadTotal: 0,
    };
    const datos = await findAll2({ coleccion: coleccion, user, wheres });

    for (let index = 0; index < datos.length; index++) {
      const elemento = datos[index];
      const props = {
        coleccion,
        user,
        fnImporte,
        fnLabelElemento,
        fnDetalleExtra,
        mod,
        elemento,
        deuda,
      };
      let itemDeuda;

      if (coleccion === "socios") itemDeuda = await calulcarDeudaSocios(props);
      if (coleccion === "actividades")
        itemDeuda = await calulcarDeudaActividades(props);

      contadoresTotal.importeTotal += itemDeuda.importe;
      contadoresTotal.importeTotalBonificaciones +=
        itemDeuda.importeBonificacion;
      contadoresTotal.cantidadTotal += itemDeuda.cantidad;
      contadoresTotal.cantidadAlcanzada = datos.length;
      //
      deuda = { ...deuda, ...contadoresTotal, estado: `GENERADO` };

      await update("generacionDeudas", deuda);
      if (index === 10) return {}; ///<------------ CORTO en 10 para probar.. sacar en PROD
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
