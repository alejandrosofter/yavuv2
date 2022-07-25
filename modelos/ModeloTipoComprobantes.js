import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombreTipoComprobante: yup.string(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    estado: "ACTIVO",
    nombreTipoComprobante: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
