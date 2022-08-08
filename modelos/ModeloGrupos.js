import { fuego } from "@nandorojo/swr-firestore";
import * as yup from "yup";

export default function ModeloGrupos() {
  return yup.object().shape({
    nombreGrupo: yup.string().required(),
    detalle: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}

export function valoresIniciales() {
  return {
    nombreActividad: "",
    detalle: "",
    estado: "ACTIVA",
    icono: "",
    acciones: [],
    idUsuario: fuego.auth().currentUser.uid,
  };
}
/////////////////ASISTENCIAS
export function ModeloAsistencias() {
  return yup.object().shape({
    estado: yup.string().required(),
  });
}

export function valoresInicialesAsistencias() {
  return {
    estado: "NORMAL",
    fecha: new Date(
      localStorage.getItem("asistencia_fecha")
        ? localStorage.getItem("asistencia_fecha")
        : ""
    ),
    fecha_timestamp: new Date().getTime(),
    integrantes: [],
  };
}

/////////////////CIERRE ASISTENCIAS
export function ModeloCierreAsistencias() {
  return yup.object().shape({
    estado: yup.string().required(),
  });
}

export function valoresInicialesCierreAsistencias() {
  return {
    estado: "PENDIENTE",
    fechaDesde: new Date(),
    fechaHasta: new Date(),
    integrantes: [],
  };
}
