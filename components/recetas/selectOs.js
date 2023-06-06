import SelectFormik from "@components/forms/select2Formik";
import { useEffect } from "react";

export default function SelectOsPaciente({ values, paciente, callbackchange }) {
  const data = paciente?.obrasSociales;
  const campo = "idOsPaciente";
  const label = "Obra Social Paciente";
  const campoId = "id";
  const campoLabel = "label_obraSocial";
  const defOs = values.id
    ? null
    : paciente?.obrasSociales?.find((item) => item.esPrimaria);
  useEffect(() => {
    if (callbackchange) callbackchange(defOs, defOs);
  }, [defOs]);
  return (
    <SelectFormik
      callbackchange={callbackchange}
      campo={campo}
      label={label}
      defaultValue={defOs}
      lista={data}
      campoId={campoId}
      campoLabel={campoLabel}
    />
  );
}
