import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import Form from "@components/actividades/grupos/_form";
export default function SelectGrupos({
  idActividad,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={`actividades/${idActividad}/grupos`}
      Modelo={Modelo}
      parentData={false}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idGrupoActividad"}
      label={label ? label : "Grupo"}
      icono="fas fa-shopping-cart"
      maxWidth="sm"
      campoId="id"
      campoLabel={(item) =>
        `${item?.nombreGrupo?.toUpperCase()} cupo (${
          item?.cantidadIntegrantes ? item?.cantidadIntegrantes : 0
        }/${item?.cupo})`
      }
    />
  );
}
