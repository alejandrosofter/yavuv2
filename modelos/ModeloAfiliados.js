import * as yup from "yup";
import { valoresIniciales as initSocio } from "./ModeloSocios";
import { fuego } from "@nandorojo/swr-firestore";
import ModeloSocios from "./ModeloSocios";
import { getSetPermiso } from "@hooks/useUser";
export default function ModeloAfiliados() {
  return yup.object().shape({
    socio: ModeloSocios(),
  });
}
export function valoresIniciales(data) {
  return {
    socio: initSocio(),
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    estado: "PENDIENTE",
    comprobante: {
      comprobante_razonSocial: data ? data.comprobante_razonSocial : "",
      comprobante_nroDocumento: data ? data.comprobante_nroDocumento : "",
      comprobante_tipoCliente: data ? data.comprobante_tipoCliente : "",
      comprobante_tipoComprobante: data ? data.comprobante_tipoComprobante : "",
      comprobante_tipoDocumento: data ? data.comprobante_tipoDocumento : "",
      comprobante_domicilio: data ? data.comprobante_domicilio : "",
      comprobante_tipoConcepto: data ? data.comprobante_tipoConcepto : "",
      tipoComprobanteNoFiscal: data ? data.tipoComprobanteNoFiscal : "",
    },
    ...getSetPermiso("afiliaciones"),
  };
}
