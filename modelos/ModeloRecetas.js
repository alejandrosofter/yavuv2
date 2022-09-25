import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    fecha: yup.string().required(),
    tipo: yup.string().required(),
  });
}
export function valoresIniciales() {
  return {
    fecha: "",
    tipo: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
////////////////////////?ESTUDIOS

export function ModeloEstudios() {
  return yup.object().shape({
    fecha: yup.string().required(),
    idEstudio: yup.string().required(),
  });
}
export function valoresInicialesEstudios() {
  return {
    fecha: new Date(),
    idEstudio: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
////////////////////////?MEDICAMENTOS

export function ModeloMedicamentos() {
  return yup.object().shape({
    fecha: yup.string().required(),
    idMedicamento: yup.string().required(),
  });
}
export function valoresInicialesMedicamentos() {
  return {
    fecha: new Date(),
    idMedicamento: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
////////////////////////?PRESTACIONES

export function ModeloPrestaciones() {
  return yup.object().shape({
    idPrestacion: yup.string().required(),
  });
}
export function valoresInicialesPrestaciones() {
  return {
    fecha: new Date(),
    idEstudio: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
