import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    fecha: yup.string().required(),
    tipo: yup.string().required(),
  });
}
export function valoresIniciales({ paciente }) {
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    tipo: "",
    idPaciente: paciente.id,
    label_obraSocial: paciente.label_obraSocial,
    obraSocial: paciente.obraSocial,
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
    idEstudio: yup.string().required("Selecciona un estudio!"),
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
    idMedicamento: yup.string().required("Selecciona un medicamento!"),
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
    idPrestacion: yup.string().required("Selecciona una prestacion!"),
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

////////////////////////?INDICACIONES

export function ModeloIndicacion() {
  return yup.object().shape({
    idIndicacion: yup.string().required("Selecciona una indicacion!"),
  });
}
export function valoresInicialesIndicacion() {
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    idIndicacion: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
