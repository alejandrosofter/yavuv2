import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function ModeloComprobantesElectronicos() {
  return yup.object().shape({
    // fecha: yup.date().required("Fecha es requerida"),
    estado: yup.string(),
    nroDocumento: yup
      .string()
      .required(
        "Nro de Documento es requerido, en caso de Tipo documento 'Otros' el valor puede ser '0'"
      ),
    razonSocial: yup.string(),
    idUsuario: yup.string(),
    domicilio: yup.string(),
    tipoComprobante: yup.string().required("Tipo de Comprobante es requerido"),
  });
}

/////
export function valoresIniciales() {
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    estado: "PENDIENTE",
    nroDocumento: "",
    validarAfipOnCreate: true,
    razonSocial: "",
    domicilio: "",
    idEntidad: "",
    ...getSetPermiso("comprobantesElectronicos"),
  };
}
/////////////////////////
export function ModeloItems() {
  return yup.object().shape({
    cantidad: yup.number(),
    importe: yup.number(),
    importeBonificacion: yup.number(),
    producto: yup.string(),

    detalle: yup.string(),
  });
}

export function valoresInicialesItems() {
  return {
    cantidad: 1,
    importe: 0,
    importeBonificacion: 0,
    producto: "",
    detalle: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
