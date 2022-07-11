import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    coleccion: yup.string(),
    campoDestino: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    estado: "PENDIENTE",
    nombre: "",
    coleccion: "",
    campoDestino: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
//////////////////
export function ModeloCampos() {
  return yup.object().shape({
    nombre: yup.string().required(),
    tipo: yup.string(),
  });
}
export function valoresInicialesCampos() {
  return {
    nombre: "",
    tipo: "",
  };
}
