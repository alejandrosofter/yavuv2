import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import axios from "axios";
import { getSetPermiso } from "@hooks/useUser";
export default function Modelo() {
  return yup.object().shape({
    nombre: yup.string().required(),
    apellido: yup.string().required(),
    dni: yup
      .number()
      .required("Es necesario el DNI!")
      .test(
        "NRO DNI EXISTENTE",
        "${path} EXISTENTE",
        async (value, testContext) => {
          const { data } = await axios.post(`/api/validadores/paciente/dni`, {
            params: testContext.parent,
          });
          if (data && data.length === 0) return true;
          // if (!data) return true;

          if (testContext.parent.id === data[0]?.id) return true;

          return testContext.createError({
            message: `Paciente ya registrado ${data[0].apellido.toUpperCase()} ${data[0].nombre.toUpperCase()} (${
              data[0].dni
            }) registrado!`,
          });

          return true;
        }
      ),
    email: yup.string(),
    telefono: yup.string(),
    obraSocial: yup.string().when("esParticular", {
      is: (val) => val === false,
      then: yup.string().required("Debes ingresar una obra social!"),
      otherwise: yup.string(),
    }),
    detalle: yup.string(),
    estado: yup.string(),
    nroAfiliado: yup.string(),
  });
}
export function ModeloBootWeb() {
  return yup.object().shape({
    bootWeb: yup.string().required(),
    detalle: yup.string(),
  });
}
export function ModeloAcciones() {
  return yup.object().shape({
    bootWeb: yup.string().required(),

    detalle: yup.string(),
    estado: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    estado: "ACTIVO",
    nombre: "",
    foto: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    obraSocial: "",
    detalle: "",
    ...getSetPermiso("pacientes"),
  };
}
//MODELO OS PACIENTE
export function ModeloOsPaciente() {
  return yup.object().shape({
    nroAfiliado: yup.string().required(),
    esDefault: yup.boolean(),
    nroCredencial: yup.string(),
    obrasSocial: yup.string(),
  });
}
export function valoresInicialesOs() {
  return {
    esDefault: false,
    nroAfiliado: "",
    nroCredencial: "",
    obrasSocial: "",
  };
}
