import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import Select2 from "../forms/select2Formik";
export default function SelectActividadGrupo({ label, campo, callbackchange }) {
  const { data } = useCollection("actividades", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });

  const { data: gruposActividad } = useCollection(
    `/actividades/${seleccionActividad?.id}/grupos`,
    { listen: true }
  );
  const [seleccionActividad, setSeleccionActividad] = useState();
  const cambiaActividad = (data, item) => {
    if (item) setSeleccionActividad(item);
  };
  if (!data) return "";
  return (
    <>
      {" "}
      <Select2
        callbackchange={cambiaActividad}
        campo={campo ? campo : "idActividad"}
        label={label ? label : "Actividad "}
        lista={data}
        campoId="id"
        campoLabel={(item) => item.nombreActividad.toUpperCase()}
      />
      <Select2
        callbackchange={callbackchange}
        campo={campo ? campo : "idGrupo"}
        label={label ? label : "Grupo "}
        lista={gruposActividad}
        campoId="id"
        campoLabel={(item) => item.nombreGrupo.toUpperCase()}
      />
    </>
  );
}
