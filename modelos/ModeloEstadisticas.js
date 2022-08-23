import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    idListeningData: yup
      .string()
      .required("Es vital que selecciones un listening!"),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    detalle: "",
    idUsuario: fuego.auth().currentUser.uid,
  };
}