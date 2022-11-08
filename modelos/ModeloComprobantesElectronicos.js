import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function ModeloCompras() {
  return yup.object().shape({
    fecha: yup.date().required("Fecha es requerida"),
    estado: yup.string(),
    nroDocumento: yup.string(),
    razonSocial: yup.string(),
    idUsuario: yup.string(),
    domicilio: yup.number(),
  });
}
/////
export function valoresIniciales() {
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    estado: "PENDIENTE",
    nroDocumento: "",
    validarAfipOnCreate: true,
    razonSocial: "",
    domicilio: "",
    idEntidad: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
