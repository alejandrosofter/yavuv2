import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function ModeloAccionTerapeutica() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function valoresInicialesAccionTerapeutica() {
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
export function ModeloPosologias() {
  return yup.object().shape({
    cantidad: yup.string().required(),
    presentacion: yup.string().required(),
    hrs: yup.string().required(),
    default: yup.boolean(),
  });
}
export function valoresInicialesPosologia() {
  return {
    cantidad: "",
    presentacion: "",
    hrs: "",
    default: false,
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function valoresIniciales() {
  return {
    nombre: "",
    nombreGenerico: "",
    estado: "ACTIVO",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
