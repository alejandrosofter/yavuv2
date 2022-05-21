import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    apellido: yup.string().required(),
    email: yup.string(),
    telefono: yup.string(),
    dni: yup.string().required(),
    obraSocial: yup.string(),
    detalle: yup.string(),
    estado: yup.string(),
    nroAfiliado: yup.string(),
  });
}
export function ModeloBootWeb() {
  return yup.object().shape({
    bootWeb: yup.string().required(),
    detalle: yup.string(),
  });
}
export function ModeloAcciones() {
  return yup.object().shape({
    bootWeb: yup.string().required(),

    detalle: yup.string(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    estado: "ACTIVO",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    obraSocial: "",
    detalle: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
