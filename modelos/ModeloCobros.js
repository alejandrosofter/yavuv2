import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { contador, contador2, contadorMoney } from "@helpers/arrays";
import moment from "moment";
export default function ModeloCobros() {
  return yup.object().shape({
    cliente: yup.string().required("Debes seleccionar el socio!"),
    detalle: yup.string(),
    importe: yup.number(),

    importeTotal: yup.number(),
    importeBonifica: yup.number(),
    esFiscal: yup.boolean(),
    importePaga: yup.number(),
    comprobante_nroDocumento: yup.string().when("esFiscal", {
      is: true,
      then: yup
        .string()
        .required(
          "el nro de documento es vital para la carga del comprobante!"
        ),
    }),
    comprobante_puntoVenta: yup.string().when("esFiscal", {
      is: true,
      then: yup
        .string()
        .required("el punto de venta es vital para la carga del comprobante!"),
    }),
    // formasDePago: yup
    //   .array()
    //   .required("Debes Ingresar por lo menos un pago!")
    //   .test(
    //     "Debe coincidir la sumatoria de los items con los pagos",
    //     "${path} EXISTENTE",
    //     (value, testContext) => {
    //       if (!value || !testContext.parent.deudas)
    //         return testContext.createError({
    //           message: `Deben haber items!`,
    //         });
    //       const importeItems = contador2(
    //         testContext.parent.deudas,
    //         (item) =>
    //           Number(item.importe) * item.cantidad -
    //           Number(item.importeBonificacion ? item.importeBonificacion : 0)
    //       );
    //       const importeFormaPagos = contador(testContext.parent?.formasDePago);
    //       if (importeItems !== importeFormaPagos)
    //         return testContext.createError({
    //           message: `Debe coincidir la sumatoria de los items con los pagos`,
    //         });
    //       return true;
    //     }
    //   ),
  });
}
export function valoresIniciales(data) {
  return {
    cliente: "",
    detalle: "",
    importe: 0,
    importeBonificacion: 0,
    importeTotal: 0,
    importePaga: 0,
    esFiscal: localStorage.getItem("cobros_esFiscal") === "true" ? true : false,
    comprobante_razonSocial: data ? data.comprobante_razonSocial : "",
    comprobante_nroDocumento: data ? data.comprobante_nroDocumento : "",
    comprobante_tipoCliente: data ? data.comprobante_tipoCliente : "",
    comprobante_tipoComprobante: data ? data.comprobante_tipoComprobante : "",
    comprobante_tipoDocumento: data ? data.comprobante_tipoDocumento : "",
    comprobante_domicilio: data ? data.comprobante_domicilio : "",
    comprobante_tipoConcepto: data ? data.comprobante_tipoConcepto : "",
    tipoComprobanteNoFiscal: data ? data.tipoComprobanteNoFiscal : "",
    coleccionClientes: data ? data.coleccionClientes : "",
    estado: "CANCELADA",
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser?.uid
      : null,
  };
}
export function ModeloItems() {
  return yup.object().shape({
    producto: yup.string(),
    importe: yup.number().required(),
    importeBonifica: yup.number(),
  });
}
export function valoresInicialesItems() {
  return {
    cantidad: 1,
    detalle: "",
    importe: "",
    importeBonificacion: 0,
    importeTotal: 0,
  };
}
export function ModeloFormasDePago() {
  return yup.object().shape({
    formaPago: yup.string().required(),
    importe: yup.number().required(),
  });
}
export function valoresInicialesFormaPago(importe) {
  return {
    formaPago: "",
    importe: importe ? importe : 0,
  };
}
