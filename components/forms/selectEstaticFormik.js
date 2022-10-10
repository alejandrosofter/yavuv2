import SelectFormik from "./select2Formik";

export default function SelectEstaticFormik({
  label,
  campo,
  disabled,
  items,
  callbackchange,
}) {
  return (
    <SelectFormik
      disabled={disabled}
      callbackchange={callbackchange}
      label={label}
      lista={items && items.map((item) => ({ nombre: item, id: item }))}
      campoLabel={"nombre"}
      campoId="id"
      campo={campo}
    />
  );
}
