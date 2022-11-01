import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    coleccion: yup.string(),
    telefono: yup.string(),
    email: yup.string(),
    detalle: yup.string(),
    estado: yup.string(),
    tieneWhatsapp: yup.boolean(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    coleccion: "",
    telefono: "",
    email: "",
    detalle: "",
    estado: "ACTIVO",
    tieneWhatsapp: false,
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
