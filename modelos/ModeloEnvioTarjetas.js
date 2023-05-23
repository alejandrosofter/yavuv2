import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    estado: yup.string().required(),
  });
}
export function valoresIniciales() {
  return {
    estado: "PENDIENTE",
    fecha: new Date(),
    ...getSetPermiso("envioTartejas"),
  };
}
//////////////////
export function ModeloCredenciales() {
  return yup.object().shape({
    apellido: yup.string().required(),
    nombre: yup.string().required(),
  });
}
export function valoresInicialesCredenciales() {
  return {
    apellido: "",
    nombre: "",
    nroSocio: "",
  };
}
