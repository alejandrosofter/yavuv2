import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export function ModeloMovimientos() {
  return yup.object().shape({
    cantidad: yup.string().required(),
    coleccion: yup.string().required(),
    fecha: yup.date(),
    idProducto: yup.string(),
  });
}
export function valoresInicialesMovimientos(preData) {
  return {
    cantidad: 0,
    coleccion: "MANUAL",
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    idProducto: preData ? preData.idProducto : "",
    ...getSetPermiso("productos"),
  };
}
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    cantidad: yup.string().required(),
    estado: yup.string(),
    esServicio: yup.boolean(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    cantidad: "",
    estado: "ACTIVO",
    detalle: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function ModeloCategoria() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function valoresInicialesCategoria() {
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
