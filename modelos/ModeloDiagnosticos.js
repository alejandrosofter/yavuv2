import { getSetPermiso } from "@hooks/useUser";
import { fuego } from "@nandorojo/swr-firestore";
import * as yup from "yup";

export default function ModeloDiagnostico() {
  return yup.object().shape({
    detalle: yup.string().required(),
    nombre: yup.string().required(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    detalle: "",
    ...getSetPermiso("diagnosticos"),
  };
}
