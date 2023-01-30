import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import moment from "moment";
export default function Modelo() {
  return yup.object().shape({
    // fecha: yup.date(),
    estado: yup.string(),
    importeAbre: yup.number(),
    puntoVenta: yup
      .string()
      .required(
        "Debes seleccionar un punto de venta, es importante para informe contable"
      ),
    formaPago: yup.array(),
  });
}
export function valoresIniciales() {
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    estado: "PENDIENTE",
    importeAbre: 0,
    formaPago: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
