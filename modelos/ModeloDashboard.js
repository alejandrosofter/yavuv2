import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function ModeloItems() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function valoresInicialesItems() {
  return {
    nombre: "",
  };
}
export function valoresIniciales() {
  return {
    nombre: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
