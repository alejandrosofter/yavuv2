import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function SelectorTipoCliente({ campo, label, callbackchange }) {
  return (
    <SelectEstaticFormik
      callbackchange={callbackchange}
      items={["CONSUMIDOR FINAL", "RESPONSABLE INSCRIPTO", "EXENTO"]}
      label={label ? label : "Tipo Cliente"}
      campo={campo ? campo : "tipoCliente"}
    />
  );
}
