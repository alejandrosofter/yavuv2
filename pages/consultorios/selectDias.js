import SelectFormik from "@components/forms/select2Formik";

export default function MultiDias({ callbackchange }) {
  const dias = [
    { label: "Lunes", value: 1 },
    { label: "Martes", value: 2 },
    { label: "Miercoles", value: 3 },
    { label: "Jueves", value: 4 },
    { label: "Viernes", value: 5 },
    { label: "Sabado", value: 6 },
    { label: "Domingo", value: 0 },
  ];
  return (
    <SelectFormik
      multiple={true}
      lista={dias}
      campoLabel="label"
      campoId="value"
      callbackchange={callbackchange}
      campo="dias"
      label="Dias"
    />
  );
}
