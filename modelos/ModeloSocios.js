import * as yup from "yup";

export default function ModeloSocios() {
  return yup.object().shape({
    nombre: yup.string().required(),
    apellido: yup.string(),
    tipoSocio: yup.string(),
    // fechaNacimiento: yup.date(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function valoresIniciales() {
  return {
    apellido: "",
    nombre: "",
    nroSocio: "",
    tipoSocio: "",
    fechaNacimiento: new Date(),
    dni: "",
    edad: "",
    categoriaSocio: "",
    domicilio: "",
    localidad: "",
    telefono: "",
    email: "",
    estadoCivil: "Otros",

    estado: "ALTA",
    label_idCliente: "seleccione...",
  };
}
export function ModeloTipoPeriodos() {
  return yup.object().shape({
    nombre: yup.string().required(),
    esConAsistencia: yup.boolean(),
    cantidadMinimaAsistencias: yup.number(),
  });
}
export function ModeloFamiliares() {
  return yup.object().shape({
    relacion: yup.string().required(),
    socio: yup.string(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function valoresInicialesFamiliares() {
  return {
    relacion: "",
    fecha: new Date(),
    socio: "",
    label_socio: "",
  };
}
export function valoresInicialesCambioEstado() {
  return {
    estado: "",
    fecha: new Date(),
  };
}
export function ModeloItemMovimientoCuenta() {
  return yup.object().shape({
    detalle: yup.string().required(),
    tipo: yup.string().required(),
    importe: yup.string().required(),
  });
}
export function ModeloCambioEstado() {
  return yup.object().shape({
    estado: yup.string().required(),
  });
}
export function valoresInicialesDocumentacion() {
  return {
    fechaVto: new Date(),
    tipo: "",
  };
}
export function ModeloDocumentos() {
  return yup.object().shape({
    //   fechaVto: yup.string().required(),
    tipo: yup.string(),
  });
}
export function valoresInicialesPromocion() {
  return {
    fechaVto: new Date(),
    fechaInicio: new Date(),
    detalle: "",
    estado: "ACTIVO",
  };
}
export function ModeloPromociones() {
  return yup.object().shape({
    //   fechaVto: yup.string().required(),
    detalle: yup.string(),
    idPromocion: yup.string(),
    estado: yup.string(),
  });
}
export function valoresInicialesTarjetas() {
  return {
    fecha: new Date(),
    detalle: "",
  };
}
export function ModeloTarjetas() {
  return yup.object().shape({
    //    fecha: yup.string(),
    detalle: yup.string(),
  });
}
export function ModeloConfig() {
  return yup.object().shape({
    //    fecha: yup.string(),
    detalle: yup.string(),
  });
}
export function ModeloCategoriaSocio() {
  return yup.object().shape({
    //    fecha: yup.string(),
    nombre: yup.string(),
    idProducto: yup.object(),
  });
}
export function ModeloGeneracionDeuda() {
  return yup.object().shape({
    nombre: yup.string(),
    fn: yup.string(),
  });
}
export function ModeloMotivos() {
  return yup.object().shape({
    detalle: yup.string(),
    estado: yup.string(),
  });
}
export function ModeloDifusion() {
  return yup.object().shape({
    nombre: yup.string(),
    condicion: yup.string(),
  });
}
export function valoresInicialesMotivos() {
  return {
    detalle: "",
    estado: "",
  };
}
export function valoresCategoriaSocio() {
  return {
    nombre: "",
    idProducto: "",
  };
}
export function ModeloTipoSocios() {
  return yup.object().shape({
    //    fecha: yup.string(),
    nombre: yup.string(),
    proximoNro: yup.number(),
  });
}
export function ModeloTipoConfig() {
  return yup.object().shape({
    //    fecha: yup.string(),
    nombreTipoDocumentacion: yup.string(),
  });
}
export function valoresInicialesActividades() {
  return {
    idActividad: "",
    fechaInicio: new Date(),
    estado: "ACTIVO",
  };
}
export function ModeloActividades() {
  return yup.object().shape({
    idActividad: yup.string().required(),
    estado: yup.string().required(),
  });
}
////////////////////////////
export function valoresDebitoAutomatico() {
  return {
    estado: "ACTIVO",
    fechaInicio: new Date(),
    detalle: "",
    cbu: "",
  };
}
export function ModeloDebitoAutomatico() {
  return yup.object().shape({
    estado: yup.string().required(),
    idCuentaCbu: yup.string().required(),
    detalle: yup.string(),
  });
}
////////////////////////////
export function valoresMensualizado(preData) {
  return {
    ...preData,
    estado: "",
    fecha: new Date(),
    fechaInicio: new Date(),
    concepto: "",
  };
}
export function ModeloMensualizado() {
  return yup.object().shape({
    fecha: yup.string(),
    fechaInicio: yup.string(),
    estado: yup.string(),
    // idProducto: yup.object(),
    detalle: yup.string(),
  });
}
////////////////////////////
export function valoresCobros() {
  return {
    estado: "CANCELADO",
    fecha: new Date(),
    idFormaPago: "",
    detalle: "",
  };
}
export function ModeloCobros() {
  return yup.object().shape({
    //    fecha: yup.string(),
    estado: yup.string(),

    idFormaPago: yup.string().required(),
    detalle: yup.string(),
  });
}
////////////////////////////
export function valoresInicialesMovimiento({ dataInicial }) {
  return {
    importe: 0,
    fecha: new Date(),
    nroRecivo: dataInicial ? dataInicial.nroRecivo : "",
  };
}
export function ModeloMovimientoCuenta() {
  return yup.object().shape({
    //    fecha: yup.string(),
    // importeAcredita:yup.number(),
    // importeDebita:yup.number(),
    importe: yup.number(),
    fecha: yup.date(),
  });
}
