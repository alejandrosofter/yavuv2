import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function ModeloPromociones() {
  return yup.object().shape({
    modDeuda: yup.string(),
    estado: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function valoresIniciales() {
  return {
    fechaVto: new Date(),
    modDeuda: "",
    concepto: "",
    estado: "ACTIVO",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function ModeloItems() {
  return yup.object().shape({
    idProducto: yup.string().required(),
    detalle: yup.string(),
    importe: yup.string(),
    porcentaje: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function valoresInicialesItems() {
  return {
    detalle: "",
    estado: "ACTIVO",
    importe: 0,
    porcentaje: 0,
    importeFijo: 0,
  };
}
