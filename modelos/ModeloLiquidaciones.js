import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    // fecha: yup.date(),
    importeTotal: yup.number(),
    label_idEnteFacturador: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    fecha: new Date(),
    importeTotal: 0,
    label_idEnteFacturador: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
