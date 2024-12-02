import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function ModeloEnteFacturador() {
  return yup.object().shape({
    nombre: yup.string().required("Nombre del ente"),
    email: yup.string(),

    estado: yup.string(),
  });
}
export function valoresIniciales(data) {
  let valores = {
    estado: "ACTIVO",
    nombre: "",
    detalle: "",
    email: "",

    ...getSetPermiso("entesFacturadores"),
  };

  return { ...valores, ...data };
}
