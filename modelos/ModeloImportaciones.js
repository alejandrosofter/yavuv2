import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    pathFile: yup.string().required(),
    destino: yup.string(),
    formato: yup.string(),
    estado: yup.string(),
    pagina: yup.number(),
  });
}
export function valoresIniciales() {
  return {
    fecha: new Date(),
    estado: "PENDIENTE",
    icono: "",
    pagina: 0,
    destino: "",
    pathFile: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
