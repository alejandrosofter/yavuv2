import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    asunto: yup.string().required(),
    cuerpo: yup.string().required(),
    destinatario: yup.string().required(),
    estado: yup.string().required(),
  });
}
export function ModeloConfig() {
  return yup.object().shape({
    nombre: yup.string().required(),
    selector: yup.string().required(),
  });
}
export function valoresInicialesConfig() {
  return {
    nombre: "",
    selector: "",
  };
}
export function valoresIniciales() {
  return {
    asunto: "",
    cuerpo: "",
    destinatario: "",
    estado: "PENDIENTE",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
