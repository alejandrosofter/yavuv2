import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    fecha: yup.date().required(),
    socio: yup.string().required(),
    motivo: yup.string(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    estado: "PENDIENTE",
    fecha: new Date(),
    socio: "",
    motivo: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
