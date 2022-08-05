import Select2 from "@components/forms/select2Formik";
import { getModUsuario } from "@helpers/db";
export default function SelectTipoPeriodo({ label, campo, callbackchange }) {
  const mod = getModUsuario("socios");
  const data = mod.config?.itemsTipoPeriodo ? mod.config.itemsTipoPeriodo : [];
  if (!data) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      campo={campo ? campo : "tipoPeriodo"}
      label={label ? label : "Tipo Periodo"}
      lista={data}
      campoId="id"
      campoLabel={(item) =>
        `${item.nombre} ${
          item.esConAsistencia
            ? `(con ${item.cantidadMinimaAsistencias} asistencias genera deuda)`
            : `(Sin asistencia)`
        }`
      }
    />
  );
}
