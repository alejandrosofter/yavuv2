import * as yup from "yup";
import { getSetPermiso } from "@hooks/useUser";
export default function ModeloTareas() {
  return yup.object().shape({
    detalle: yup.string(),
    fecha: yup.date(),
    fechaBusca: yup.string(),
    fechaEjecucion: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    nombreCentroCosto: "",
    ...getSetPermiso("tareas"),
  };
}
