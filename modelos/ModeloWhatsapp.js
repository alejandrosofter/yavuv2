import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export function ModeloWhatsappMensaje() {
  return yup.object().shape({
    mensaje: yup.string().required(),
    nro: yup
      .string()
      .required(
        "Al parecer no seleccionaste ningun contacto o bien el contacto no esta seleccionado con un telefono con cuenta de whatsapp"
      ),

    fecha: yup.date().default(function () {
      return new Date();
    }),
  });
}
export function valoresInicialesWhatsappMensaje() {
  return {
    mensaje: "",
    fecha: new Date(),
    fecha_timestamp: new Date().getTime(),
    nro: "",
    estado: "PENDIENTE",
    ...getSetPermiso("whatsapp"),
  };
}
