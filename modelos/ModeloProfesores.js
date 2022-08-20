import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function ModeloProfesores() {
  return yup.object().shape({
    nombre: yup.string().required(),
    apellido: yup.string().required(),
    dni: yup.string().required(),
    telefono: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    usermod: fuego.auth().currentUser.uid,
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
  };
}
