import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    fecha: yup.string().required(),

    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    fecha: new Date(),
    estado: "PENDIENTE",

    idUsuario: fuego.auth().currentUser.uid,
  };
}
