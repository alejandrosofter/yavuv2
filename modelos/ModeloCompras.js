import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function ModeloCompras() {
  return yup.object().shape({
    detalle: yup.string(),
    estado: yup.string(),
    idCentroCosto: yup.string(),
    idEntidad: yup.string(),
    idUsuario: yup.string(),
    importeTotal: yup.number(),
    // fecha: yup.date(),
  });
}
export function ModeloItems() {
  return yup.object().shape({
    detalle: yup.string(),
    cantidad: yup.number(),
    importe: yup.number(),
  });
}
export function valoresInicialesItems() {
  return {
    detalle: "",
    cantidad: 0,
    importe: 0,
  };
}
////////////////////////
export function ModeloItemsFormaPago() {
  return yup.object().shape({
    detalle: yup.string(),
    importe: yup.number(),
  });
}
export function valoresInicialesFormaPago() {
  return {
    detalle: "",
    importe: 0,
  };
}
/////
export function valoresIniciales() {
  return {
    fecha: new Date(),
    detalle: "",
    estado: "PENDIENTE",
    idCentroCosto: "",
    idEntidad: "",
    ...getSetPermiso("compras"),
  };
}
