import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import randomId from "random-id";
export default function Modelo() {
  return yup.object().shape({
    cantidad: yup.number().required(),
    // idProducto: yup.string().required(),
    importe: yup.number().required(),
    detalle: yup.string(),
    estado: yup.string().required(),
  });
}
export function valoresIniciales(preData) {
  const data = {
    cantidad: 1,
    idProducto: "",
    _id: randomId(),
    estado: "PENDIENTE",
    importe: 0,
    fecha: new Date(),
    fechaVto: new Date(),
    idUsuario: fuego.auth().currentUser.uid,
  };
  return { ...data, ...preData };
}
