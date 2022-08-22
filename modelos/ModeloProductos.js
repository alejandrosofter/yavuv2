import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
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
