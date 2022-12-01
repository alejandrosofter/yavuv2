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
/////////////////////////////////
export function ModeloCategoria() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function inicialesCategoria() {
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
