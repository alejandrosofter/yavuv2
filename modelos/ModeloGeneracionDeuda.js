import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import moment from "moment";
export default function ModeloGeneracionDeuda() {
  return yup.object().shape({
    detalle: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function ModeloGeneracionDeudaItems() {
  return yup.object().shape({
    concepto: yup.string().required(),
    detalle: yup.string(),
    detalleExtra: yup.string(),
    estado: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function valoresInicialesItems() {
  return {
    fecha: new Date(),
    fechaVto: new Date(),
    detalleExtra: "",
    estado: "",
    idDestino: "",
    idElemento: "",
    idGeneracionDeuda: "",
    importe: "",
    importeBonificacion: "",
    estado: "",
    estado: "",

    estado: "PENDIENTE",
  };
}
export function valoresIniciales() {
  return {
    fecha: new Date(),
    fechaVto: new Date(),
    detalle: "",
    concepto: "",
    estado: "PENDIENTE",
    conjunto: "",
    calculoImporte: "",
    idUsuario: fuego.auth().currentUser.uid,
    conjunto: "",
    fnDetalleExtra: "",
    fnLabelElemento: "",
  };
}

/////////////////// movimienito
export function ModeloMovimiento() {
  return yup.object().shape({
    fecha: yup.string().required(),
    comentario: yup.string(),
    estado: yup.string().required(),
    tipoOperacion: yup.string().required(),
    idProducto: yup
      .string()
      .required("Debes seleccionar un producto para generar la deuda"),
  });
}

export function valoresInicialesMovimiento(predata) {
  return {
    ...predata,
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    tipoSeteoFecha: "FIJA", //+1 MES
    fechaProximaCuota: moment().add(1, "months").set("date", 1).toDate(),
    fechaProximaCuota_timestamp: moment()
      .add(1, "months")
      .set("date", 1)
      .toDate()
      .getTime(),
    estado: "PENDIENTE",
    // items: predata.seleccion ? predata.seleccion : [],
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function ModeloItemMovimiento() {
  return yup.object().shape({
    // obraSocial: yup.string().required(),
    estado: yup.string(),
  });
}
