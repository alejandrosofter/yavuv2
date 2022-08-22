import * as yup from "yup";
import { valoresIniciales as initSocio } from "./ModeloSocios";
import { fuego } from "@nandorojo/swr-firestore";
import ModeloSocios from "./ModeloSocios";
export default function ModeloAfiliados() {
  const socio = ModeloSocios();
  return yup.object().shape({
    socio,
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
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
