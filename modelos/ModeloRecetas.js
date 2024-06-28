import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    fecha: yup.string().required(),
    tipo: yup.string(),
  });
}
export function valoresIniciales({ paciente, receta }) {
  if (receta) return { ...receta };
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    fechaReceta: new Date(),
    fechaReceta_timestamp: new Date().getTime(),
    fechaDiagnostico: new Date(),
    fechaDiagnostico_timestamp: new Date().getTime(),
    tipo: "MEDICAMENTO",
    idPaciente: paciente ? paciente.id : "",
    esParticular: paciente ? paciente.esParticular : false,
    label_obraSocial: paciente ? paciente.label_obraSocial : "",
    obraSocial: paciente ? paciente.obraSocial : "",
    ...getSetPermiso("recetas"),
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

////////////////////////?ANTEOJOS

export function ModeloAnteojos() {
  return yup.object().shape({
    fecha: yup.string().required(),
  });
}
export function valoresInicialesAnteojos() {
  return {
    fecha: new Date(),

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
    cantidad: 1,
    detalle: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
////////////////////////?DIAGNOSTICO

export function ModeloDiagnostico() {
  return yup.object().shape({
    fecha: yup.string().required(),
    // detalle: yup.string().required("Selecciona un detalle"),
  });
}
export function valoresInicialesDiagnostico() {
  return {
    fecha: new Date(),
    cantidad: 1,
    detalle: "",
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
    cantidad: yup.number().required("Cantidad?"),
  });
}
export function valoresInicialesPrestaciones() {
  return {
    fecha: new Date(),
    idEstudio: "",
    cantidad: 1,
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
    detalle: yup.string().required("Escribe el detalle!"),
  });
}
export function valoresInicialesIndicacion() {
  return {
    fecha: new Date(),
    detalle: "",
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
