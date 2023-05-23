import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    asunto: yup.string().required(),
    modulo: yup.string(),
    mensaje: yup.string(),
    condicion: yup.string().required(),
    estado: yup.string(),
  });
}
export function ModeloConfigItems() {
  return yup.object().shape({
    modulo: yup.string(),
    condicion: yup.string(),
  });
}
export function valoresInicialesMods() {
  return {
    nombre: "",
    condicion: "",
  };
}
export function valoresIniciales() {
  return {
    estado: "PENDIENTE",
    modulo: "",
    asunto: "",
    mensaje: "",
    fecha: new Date(),
    ...getSetPermiso("difusion"),
  };
}
//////////////////
