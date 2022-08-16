import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
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
