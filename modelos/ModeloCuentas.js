import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function ModeloCuentas() {
  return yup.object().shape({
    razonSocial: yup.string(),
    email: yup.string().required(),
    plan: yup.string(),
    telefono: yup.string().required(),
    idUsuario: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    email: "",
    plan: "",
    telefono: "",
    ...getSetPermiso("cuentas"),
  };
}
