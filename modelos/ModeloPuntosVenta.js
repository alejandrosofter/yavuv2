import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    estado: "ACTIVO",
    // ...getSetPermiso("puntos"),
  };
}
