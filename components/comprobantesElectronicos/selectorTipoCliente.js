import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function SelectorTipoCliente({ campo, label, callbackchange }) {
  return (
    <SelectEstaticFormik
      callbackchange={callbackchange}
      items={["EXENTO", "GRAVADO"]}
      label={label ? label : "Tipo Cliente"}
      campo={campo ? campo : "tipoCliente"}
    />
  );
}
