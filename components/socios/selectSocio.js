import SelectFormikAlgolia from "@components/forms/selectAlgoliaFormik";

export default function SelectSocio({ campo, label }) {
  return (
    <SelectFormikAlgolia
      coleccionAlgolia={"socios"}
      label={label}
      labelItems={(opt) =>
        `${opt.apellido} ${opt.nombre} - ${opt.dni} - ${opt.nroSocio}`
      }
      campo={campo}
    />
  );
}
