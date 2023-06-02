import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export default function ModeloClientes() {
  return yup.object().shape({
    nombre: yup.string().when("esEmpresa", (esEmpresa) => {
      if (!esEmpresa)
        return yup.string().required("Ingresa por favor un nombre");
    }),
    apellido: yup.string().when("esEmpresa", (esEmpresa) => {
      if (!esEmpresa)
        return yup.string().required("Ingresa por favor un apellido");
    }),
    dni: yup.string().when("esEmpresa", (esEmpresa) => {
      if (!esEmpresa) return yup.string().required("Ingresa por favor un dni");
    }),
    tipoCliente: yup.string(),
    esEmpresa: yup.boolean(),
    razonSocial: yup.string().when("esEmpresa", (esEmpresa) => {
      if (esEmpresa)
        return yup.string().required("Ingresa por favor una Razon Social");
    }),
    cuit: yup.string().when("esEmpresa", (esEmpresa) => {
      if (esEmpresa) return yup.string().required("Ingresa por favor un cuit");
    }),
    tipo: yup.string(),
  });
}
export function ModeloTipos() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export function valoresIniciales() {
  return {
    nombre: "",
    apellido: "",
    razonSocial: "",
    cuit: "",
    tipo: "",
    ...getSetPermiso("clientes"),
  };
}
