import Select2 from "@components/forms/select2Formik";
export default function SelectMotivoDesafiliacion({
  label,
  campo,
  callbackchange,
  mod,
}) {
  const data = mod?.config?.itemsMotivosEstados;
  if (!data) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      campo={campo ? campo : "motivo"}
      label={label ? label : "Motivo"}
      lista={data}
      campoId="id"
      campoLabel="detalle"
    />
  );
}
