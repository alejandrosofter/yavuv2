import * as yup from "yup";

export default function ModeloCuentas() {
  return yup.object().shape({
    razonSocial: yup.string().required(),
    email: yup.string().required(),
    plan: yup.string(),
    telefono: yup.string().required(),
    idUsuario: yup.string(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    email: "",
    plan: "",
    telefono: "",
    idUsuario: "",
  };
}
