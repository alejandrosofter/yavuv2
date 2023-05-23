import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    paciente: yup.string().required(),
    detalle: yup.string(),
    estado: yup.string(),
  });
}
export function valoresIniciales(data) {
  let valores = {
    estado: "PENDIENTE",
    paciente: "",
    detalle: "",
    fecha: new Date(),
    ...getSetPermiso("consultaPaciente"),
  };
  return { ...valores, ...data };
}
