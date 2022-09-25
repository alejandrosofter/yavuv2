import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    codigo: yup.string(),
    importe: yup.string(),
    obraSocial: yup.string(),
  });
}
export function ModeloPrestacion() {
  return yup.object().shape({
    prestacion: yup.string().required(),
  });
}
export function inicialesPrestacion() {
  return {
    prestacion: "",
  };
}

export function valoresIniciales() {
  return {
    nombre: "",
    codigo: "",
    importe: "",
    obraSocial: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
