import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    asunto: yup.string().required(),
    modulo: yup.string(),
    mensaje: yup.string(),
    condicion: yup.string().required(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    estado: "PENDIENTE",
    modulo: "",
    asunto: "",
    mensaje: "",
    fecha: new Date(),
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
//////////////////
