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
    dataSave: {
      id: new Date().getTime(),
      nombre: "Inicial",
    },
    campoDestino: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
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
