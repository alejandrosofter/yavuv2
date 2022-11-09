import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import moment from "moment";
export default function Modelo() {
  return yup.object().shape({
    fecha: yup.date(),
    estado: yup.string(),
    importeAbre: yup.number(),
    formaPago: yup.array(),
  });
}
export function valoresIniciales() {
  return {
    fecha: moment.utc().startOf("day"),
    fecha_timestamp: moment.utc().startOf("day").unix(),
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
