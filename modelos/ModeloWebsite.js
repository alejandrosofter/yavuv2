import * as yup from "yup";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string(),
    detalle: yup.string(),
    token: yup.string(),
  });
}

export function valoresIniciales() {
  return {
    nombre: "",
    token: "",
    ...getSetPermiso("website"),
  };
}
