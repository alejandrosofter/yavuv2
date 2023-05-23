import { getSetPermiso } from "@hooks/useUser";
import * as yup from "yup";

export default function ModeloPlanes() {
  return yup.object().shape({
    nombre: yup.string().required(),
    detalle: yup.string(),
    icono: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
    modulos: yup.array().required("Debe seleccionar algun modulo!"),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    detalle: "",
    icono: "",
    acciones: [],
    ...getSetPermiso("planes"),
  };
}
