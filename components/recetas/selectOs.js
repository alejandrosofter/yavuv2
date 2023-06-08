import SelectFormik from "@components/forms/select2Formik";
import { useEffect } from "react";

export default function SelectOsPaciente({ setFieldValue, values, paciente }) {
  const data = paciente?.obrasSociales;
  const campo = "idOsPaciente";
  const label = "Obra Social Paciente";
  const campoId = "id";
  const campoLabel = "label_obraSocial";
  const defOs = values.id
    ? null
    : paciente?.obrasSociales?.find((item) => item.esPrimaria);
  useEffect(() => {
    if (!values[campo]) return;
    const item = data?.find((item) => item.id === values[campo]);

    setFieldValue(`valores_${campo}`, item);
  }, [values[campo]]);
  const callbackchange = (values, item) => {
    setFieldValue(`valores_${campo}`, item);
  };

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
