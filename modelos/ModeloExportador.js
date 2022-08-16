import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
export function ModeloItems() {
  return yup.object().shape({
    nombreCampo: yup.string().required(),
    tipoDato: yup.string().required(),
    condicion: yup.string().required(),
  });
}
export function valoresInicialesItems() {
  return {
    nombreCampo: "",
    tipoDato: ">",
    tipoDato: "string",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
