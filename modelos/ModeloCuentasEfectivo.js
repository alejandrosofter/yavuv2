import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    idCuentaBanco,
    ...getSetPermiso("cuentasEfectivo"),
  };
}
