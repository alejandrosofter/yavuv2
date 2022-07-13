import * as yup from "yup";
import { valoresIniciales as initSocio } from "./ModeloSocios";
import { fuego } from "@nandorojo/swr-firestore";
export default function ModeloAfiliados() {
  return yup.object().shape({
    socio: yup.object().shape({
      nombre: yup.string().required("El nombre del socio es necesario!"),
      apellido: yup.string().required("El apellido del socio tambien!"),
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
            //responseText === 'true'

            if ("apellido" in res)
              return testContext.createError({
                message: `${res.apellido.toUpperCase()} ${res.nombre.toUpperCase()} registrado`,
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
    idUsuario: fuego.auth().currentUser.uid,
  };
}
