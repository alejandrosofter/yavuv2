import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    importe: yup.number(),
    estado: yup.string(),
    importeTotal: yup.number(),
  });
}
export function ModeloRespuestasBanco() {
  return yup.object().shape({
    estado: yup.string(),
    importeTotalCobrado: yup.number(),
  });
}
export function valoresInicialesRespuestas({ idDebito }) {
  return {
    importeTotal: 0,
    estado: "PENDIENTE",
    fecha: new Date(),
    idDebito,
    archivo: "",
  };
}
export function valoresIniciales() {
  return {
    importe: 0,
    importeTotal: 0,
    estado: "PENDIENTE",
    fecha: new Date(),
    primerVto: new Date(),
    segundoVto: new Date(),
    tercerVto: new Date(),
    ...getSetPermiso("debitoAutomatico"),
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
