import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function ModeloCobros() {
  return yup.object().shape({
    cliente: yup.string().required(),
    detalle: yup.string(),
    importe: yup.number(),

    importeTotal: yup.number(),
    importeBonifica: yup.number(),
    importePaga: yup.number(),
  });
}
export function valoresIniciales() {
  return {
    cliente: "",
    detalle: "",
    importe: 0,
    importeBonificacion: 0,
    importeTotal: 0,
    importePaga: 0,
    estado: "CANCELADA",
    fecha: new Date(),
    idUsuario: fuego.auth().currentUser.uid,
  };
}
export function ModeloItems() {
  return yup.object().shape({
    producto: yup.string(),
    importe: yup.number().required(),
    importeBonifica: yup.number(),
  });
}
export function valoresInicialesItems() {
  return {
    cantidad: 1,
    detalle: "",
    importe: "",
    importeBonifica: 0,
    importeTotal: 0,
  };
}
export function ModeloFormasDePago() {
  return yup.object().shape({
    formaPago: yup.string().required(),
    importe: yup.number().required(),
  });
}
export function valoresInicialesFormaPago(importe) {
  return {
    formaPago: "",
    importe: importe ? importe : 0,
  };
}
