import * as yup from "yup";
import { valoresIniciales as initSocio } from "./ModeloSocios";
import { fuego } from "@nandorojo/swr-firestore";
import ModeloSocios from "./ModeloSocios";
export default function ModeloAfiliados() {
  return yup.object().shape({
    // socio: ModeloSocios(),
  });
}
export function valoresIniciales() {
  return {
    socio: initSocio(),
    fecha: new Date(),
    estado: "PENDIENTE",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
  };
}
