import { fuego } from "@nandorojo/swr-firestore";
import * as yup from "yup";

export default function ModeloGrupos() {
  return yup.object().shape({
    mercado: yup.string().required(),
    importe: yup.number(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}

export function valoresIniciales() {
  return {
    mercado: "",
    importe: 0,
    estado: "ACTIVA",
    idUsuario: fuego.auth().currentUser.uid,
  };
}

//**************************tradings */
export function ModeloHistorial() {
  return yup.object().shape({
    estado: yup.string().required(),

    evento: yup.string(),
    importe: yup.string(),
    importeEntrada: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}

export function valoresInicialesHistorial() {
  return {
    estado: "",
    estado: "CAMBIO POSICION",
    idUsuario: fuego.auth().currentUser.uid,
  };
}
