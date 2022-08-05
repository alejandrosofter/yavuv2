import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
export default function SelectGrupos({
  label,
  campo,
  callbackchange,
  idActividad,
}) {
  const { data } = useCollection(`actividades/${idActividad}/grupos`);
  if (!data) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      campo={campo ? campo : "idGrupoActividad"}
      label={label ? label : "Grupo"}
      lista={data}
      campoId="id"
      campoLabel={(item) =>
        `${item.nombreGrupo.toUpperCase()} cupo (${
          item.cantidadIntegrantes ? item.cantidadIntegrantes : 0
        }/${item.cupo})`
      }
    />
  );
}
