import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    // obraSocial: yup.string().required(),
    estado: yup.string(),
  });
}
export function ModeloItemMovimiento() {
  return yup.object().shape({
    // obraSocial: yup.string().required(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    estado: "PENDIENTE",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
/////////////////// movimienito
export function ModeloMovimiento() {
  return yup.object().shape({
    fecha: yup.string().required(),
    comentario: yup.string(),
    estado: yup.string().required(),
  });
}

export function valoresInicialesMovimiento(predata) {
  return {
    ...predata,
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    estado: "PENDIENTE",
    items: predata.seleccion ? predata.seleccion : [],
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
