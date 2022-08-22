import * as yup from "yup";
import { valoresIniciales as initSocio } from "./ModeloSocios";
import { fuego } from "@nandorojo/swr-firestore";
import ModeloSocios from "./ModeloSocios";
export default function ModeloAfiliados() {
  return yup.object().shape({
    socio: yup.object().shape({
      nombre: yup.string().required("El NOMBRE del socio es necesario!"),
      apellido: yup.string().required("El APELLIDO del socio tambien!"),
      nroSocio: yup
        .number()
        .required("Es necesario el NRO DE SOCIO!")
        .test(
          "NRO SOCIO no existente",
          "${path} EXISTENTE",
          async (value, testContext) => {
            const { data } = await axios.post(
              `/api/validadores/socio/nroSocio`,
              {
                params: testContext.parent,
              }
            );
            if (!data) return true;
            console.log(testContext.parent, data);

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
            if (testContext.parent.id === res.id) return true;
            if ("apellido" in res)
              return testContext.createError({
                message: `${res.apellido.toUpperCase()} ${res.nombre.toUpperCase()} (${
                  res.nroSocio
                }) registrado!`,
              });

            return true;
          }
        ),
    }),
  });
}
export function valoresIniciales() {
  return {
    socio: initSocio(),
    fecha: new Date(),
    estado: "PENDIENTE",
    idUsuario: localStorage.getItem("usermod")
      ? localStorage.getItem("usermod")
      : fuego.auth().currentUser.uid,
    usermod: localStorage.getItem("usermod")
      ? fuego.auth().currentUser.uid
      : null,
  };
}
