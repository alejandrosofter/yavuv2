import axios from "axios";
import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
export default function ModeloSocios() {
  return yup.object().shape({
    nombre: yup.string().required("El NOMBRE del socio es necesario!"),
    apellido: yup.string().required("El APELLIDO del socio tambien!"),
    nroSocio: yup
      .number()
      .required("Es necesario el NRO DE SOCIO!")
      .test(
        "NRO SOCIO no existente",
        "${path} EXISTENTE",
        async (value, testContext) => {
          const { data } = await axios.post(`/api/validadores/socio/nroSocio`, {
            params: testContext.parent,
          });
          if (!data) return true;

          // ;
          if (testContext.parent.id === data?.id) return true;

          return testContext.createError({
            message: `Socio ${
              data.label_tipoSocio
            } ya registrado con este NRO DE SOCIO: ${data.apellido.toUpperCase()} ${data.nombre.toUpperCase()} (${
              data.nroSocio
            }) registrado!`,
          });

          return true;
        }
      ),
    telefonoMobil: yup.string().required("Ingresa un TELEFONO por favor"),
    email: yup.string().email("Ingresa un EMAIL valido por favor"),
    categoriaSocio: yup
      .string()
      .required("Debes seleccionar un CATEGORIA de socio!"),
    dni: yup
      .string()
      .required("Es necesario el DNI")
      .test(
        "Dni no existente",
        "${path} EXISTENTE",
        async (value, testContext) => {
          const res = await (
            await fetch(`/api/validadores/socio/dni/${value}`)
          ).json();
          if (testContext.parent.dni === res.dni) return true;
          if ("apellido" in res)
            return testContext.createError({
              message: `${res.apellido.toUpperCase()} ${res.nombre.toUpperCase()} (${
                res.nroSocio
              }) registrado!`,
            });

          return true;
        }
      ),
  });
}
export function valoresIniciales() {
  return {
    apellido: "",
    nombre: "",
    nroSocio: 0,
    tipoSocio: "",
    fechaNacimiento: new Date(),
    dni: "",
    edad: "",
    categoriaSocio: "",
    domicilio: "",
    localidad: "",
    telefono: "",
    email: "",
    telefonoMobil: "",
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
////////////////////////////////////////MOTIVOS
export function ModeloMotivosCambioEstado() {
  return yup.object().shape({
    nombre: yup.string().required(),
    estado: yup.string(),
  });
}
export function valoresInicialesMotivoCambioEstado() {
  return {
    nombre: "",
    estado: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function valoresInicialesCambioEstado() {
  return {
    estado: "",
    fecha: new Date(),

    // status: "PENDIENTE",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function ModeloItemMovimientoCuenta() {
  return yup.object().shape({
    detalle: yup.string().required(),
    tipo: yup.string().required(),
    importe: yup.string().required(),
  });
}
export function ModeloEstadoCuenta() {
  return yup.object().shape({
    detalle: yup.string().required(),
    tipo: yup.string().required(),
    importeTotal: yup.string().required(),
  });
}
export function ModeloCambioEstado() {
  return yup.object().shape({
    estado: yup.string().required("Debes seleccionar un estado"),
    idMotivo: yup.string().required("Debes seleccionar un motivo"),
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
    tipo: yup.string().required("Seleccione un tipo de carnet"),
    estado: yup.string().required("Seleccione un estado por favor"),
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
export function valoresInicialesTipoSocios() {
  return {
    nombre: "",
    proximoNro: 0,
  };
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
    estado: "ALTA",
    estadoMovimiento: "PENDIENTE",
    fechaUpdateEstado_timestamp: new Date().getTime(),
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),

    fechaInicio: new Date(),
    fechaInicio_timestamp: new Date().getTime(),
    concepto: "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function ModeloMensualizado() {
  return yup.object().shape({
    fecha: yup.string().required("Es necesaria la fecha!"),
    fechaInicio: yup
      .string()
      .required(
        "Es muy importante que selecciones la FECHA DE INICIO de la mensualizacion"
      ),
    estado: yup.string(),
    idGrupoActividad: yup.string().when("agregarActividad", {
      is: true,
      then: yup.string().required("Debes seleccionar un grupo"),
    }),
    idActividad: yup.string().when("agregarActividad", {
      is: true,
      then: yup.string().required("Debes seleccionar una actividad"),
    }),
    tipoPeriodo: yup
      .string()
      .required("Es necesario que selecciones un PERIODO"),
    idProducto: yup.string().required("Es necesario que asocies un PRODUCTO!"),
    idCuentaCbu: yup.string().when("esPorDebitoAutomatico", {
      is: true,
      then: yup.string().required("Debes seleccionar una cuenta CBU"),
    }),
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
export function valoresInicialesMovimiento() {
  return {
    importe: 0,
    fecha: new Date(),
    fechaVto: new Date(),
    estado: "PENDIENTE",
    cantidad: 1,
    importeBonificacion: 0,
    // nroRecivo: dataInicial ? dataInicial.nroRecivo : "",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function valoresInicialesEstadoCuenta({ dataInicial }) {
  return {
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    importeSaldo: 0,
    importeTotal: 0,
    detalle: "",
    tipo: "MANUAL",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
export function ModeloMovimientoCuenta() {
  return yup.object().shape({
    fecha: yup.date(),
    // importeAcredita:yup.number(),
    // importeDebita:yup.number(),
    importe: yup.number(),
    importeBonificacion: yup.number(),
    fechaVto: yup.date(),
  });
}
