import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    // obraSocial: yup.string().required(),
    estado: yup.string(),
  });
}

export function valoresIniciales() {
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    estado: "PENDIENTE",
    obraSocial: "",
    ...getSetPermiso("prestacionesImportar"),
  };
}
