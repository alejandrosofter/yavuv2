import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modelo() {
  return yup.object().shape({
    consultorio: yup.string().required("El consultorio es requerido"),
    // tipoTurno: yup.string().required("El tipo de turno es requerido"),
    detalle: yup.string(),
    estado: yup.string(),
  });
}
export function valoresIniciales(data) {
  let valores = {
    estado: "PENDIENTE",
    paciente: "",
    detalle: "",
    duracion: "",
    notificar: true,
    emailNotifica: "",
    fecha: new Date(),
    idUsuario: fuego.auth().currentUser.uid,
  };
  return { ...valores, ...data };
}
export function ModeloHorarios() {
  return yup.object().shape({
    desde: yup.string().required(),
    hasta: yup.string(),
    cada: yup.string(),
    dias: yup.array(),
    emailNotifica: yup.string(),
  });
}
export function valoresInicialesHorarios(data) {
  let valores = {
    hasta: "",
    desde: "",
    cada: "",
    dias: "",
    idUsuario: fuego.auth().currentUser?.uid,
  };
  return { ...valores, ...data };
}
