import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function ModeloProveedores() {
  return yup.object().shape({
    razonSocial: yup.string(),
    cuit: yup.string(),
    tipo: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    razonSocial: "",
    cuit: "",
    tipo: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
