import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    accion: yup.string(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    fecha: new Date(),
    estado: "PENDIENTE",
    accion: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
