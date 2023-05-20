import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function ModeloCentroCostos() {
  return yup.object().shape({
    nombreCentroCosto: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    nombreCentroCosto: "",
    ...getSetPermiso("centroCostos"),
  };
}
