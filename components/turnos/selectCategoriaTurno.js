import Select from "@components/forms/select2Formik";
import { getModUsuario } from "@helpers/db";
export default function Modulo({ callbackchange, campo, label }) {
  const mod = getModUsuario("turnos");
  const data = mod.config?.categoriaTurnos ? mod.config?.categoriaTurnos : [];
  if (!data) return "";
  return (
    <Select
      callbackchange={callbackchange}
      campo={campo ? campo : "categoriaTurnos"}
      label={label ? label : "Categoria Turno"}
      lista={data}
      campoId="id"
      campoLabel="nombre"
    />
  );
}
