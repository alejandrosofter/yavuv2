import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import axios from "axios";
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
          if (!data) return true;
          console.log(testContext.parent, data);
          if (testContext.parent.dni === data?.dni) return true;

          return testContext.createError({
            message: `Paciente ya registrado ${data.apellido.toUpperCase()} ${data.nombre.toUpperCase()} (${
              data.dni
            }) registrado!`,
          });

          return true;
        }
      ),
    email: yup.string(),
    telefono: yup.string(),
    obraSocial: yup.string(),
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
    idUsuario: fuego.auth().currentUser.uid,
  };
}
