import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    estado: yup.string().required(),
  });
}
export function valoresIniciales() {
  return {
    estado: "PENDIENTE",
    fecha: new Date(),
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
  };
}
//////////////////
export function ModeloCredenciales() {
  return yup.object().shape({
    apellido: yup.string().required(),
    nombre: yup.string().required(),
  });
}
export function valoresInicialesCredenciales() {
  return {
    apellido: "",
    nombre: "",
    nroSocio: "",
  };
}
