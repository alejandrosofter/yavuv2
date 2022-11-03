import SelectFormikAlgolia from "@components/forms/selectAlgoliaFormik";

export default function SelectSocio({
  campo,
  label,
  callbackchange,
  initLabel,
}) {
  return (
    <SelectFormikAlgolia
      coleccionAlgolia={"socios"}
      label={label}
      initLabel={initLabel}
      callbackchange={callbackchange}
      labelItems={(opt) =>
        `${opt.apellido} ${opt.nombre} - ${opt.dni} - ${opt.nroSocio} | ${opt.estado}`
      }
      campo={campo}
    />
  );
}
