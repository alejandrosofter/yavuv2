import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    direccion: yup.string().required(),
    ubicacion: yup.string(),
    telefono: yup.string(),
    email: yup.string(),
    detalle: yup.string(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    estado: "ACTIVO",
    nombre: "",
    ubicacion: "",
    email: "",
    telefono: "",
    dni: "",

    detalle: "",
    ...getSetPermiso("consultorios"),
  };
}
