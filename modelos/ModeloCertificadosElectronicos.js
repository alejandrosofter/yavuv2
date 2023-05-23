import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    // fechaVto: yup.date().required(),
    cuit: yup.string(),
    nroPuntoVenta: yup.string(),
    pk: yup.string(),
    pedido: yup.string(),
    proximoNroComprobante: yup.number(),
  });
}
export function valoresIniciales() {
  return {
    fechaVto: new Date(),
    fechaVto_timestamp: new Date().getTime(),
    cuit: "",
    nroPuntoVenta: "",
    pk: "",
    pedido: "",
    certificado: "",
    estado: "PENDIENTE",
    ...getSetPermiso("certificadosElectronicos"),
  };
}
