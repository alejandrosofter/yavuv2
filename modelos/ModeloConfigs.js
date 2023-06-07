import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    ref: yup.string(),
    data: yup.object(),
  });
}
export function valoresIniciales() {
  return {
    ref: "",
    data: {},
    ...getSetPermiso("modulos_config"),
  };
}
