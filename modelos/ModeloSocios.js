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
    fecha: { seconds: new Date().getTime() / 1000, nanoseconds: 0 },
    socio: "",
    label_socio: "",
  };
}
export function valoresInicialesCambioEstado() {
  return {
    estado: "",
    fecha: { seconds: new Date().getTime() / 1000, nanoseconds: 0 },
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
    fechaVto: { seconds: new Date().getTime() / 1000, nanoseconds: 0 },
    fechaInicio: { seconds: new Date().getTime() / 1000, nanoseconds: 0 },
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
    fecha: { seconds: new Date().getTime() / 1000, nanoseconds: 0 },
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
    porcentualObligacion: "100",
    estado: "ACTIVO",
    idProducto: "",
  };
}
export function ModeloActividades() {
  return yup.object().shape({
    esPorDebitoAutomatico: yup.boolean(),
    idActividad: yup.string().required(),
    estado: yup.string().required(),
    porcentualObligacion: yup.string().required(),
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
    //    fecha: yup.string(),
    estado: yup.string().required(),
    idCuentaCbu: yup.string().required(),
    detalle: yup.string(),
  });
}
////////////////////////////
export function valoresMensualizado() {
  return {
    estado: "",
    fecha: new Date(),
    concepto: "",
  };
}
export function ModeloMensualizado() {
  return yup.object().shape({
    //    fecha: yup.string(),
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
    importeAcredita: 0,
    importeDebita: 0,
    fecha: { seconds: new Date().getTime() / 1000, nanoseconds: 0 },
    nroRecivo: dataInicial ? dataInicial.nroRecivo : "",
  };
}
export function ModeloMovimientoCuenta() {
  return yup.object().shape({
    //    fecha: yup.string(),
    // importeAcredita:yup.number(),
    // importeDebita:yup.number(),
    // nroRecivo:yup.string()
    estado: yup.string(),
  });
}
