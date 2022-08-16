import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function ModeloModulos() {
  return yup.object().shape({
    nombre: yup.string().required(),
    label: yup.string().required(),
    grupo: yup.string().required(),
    detalle: yup.string(),
    icono: yup.string(),
    coleccion: yup.string(),
    camposModulo: yup.string(),
    id: yup.string(),
    esBase: yup.boolean(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function ModeloAcciones() {
  return yup.object().shape({
    nombre: yup
      .string()
      .required("Es requerido para buscar el componente el las librerias"),
    label: yup.string().required("Es requerido"),
    icono: yup.string(),

    descripcion: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    detalle: "",
    label: "",
    icono: "",
    destinoDeuda: "",
    acciones: [],
    idUsuario: fuego.auth().currentUser.uid,
  };
}
export function valoresInicialesItems() {
  return {
    nombre: "",
    label: "",
    icono: "",
    descripcion: "",
  };
}
