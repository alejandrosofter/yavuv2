import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloDashboard";
import Form from "@components/dashboard/_form";
export default function SelectDashboard({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"dashboards"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      extraData={["importe"]}
      multiple={multiple}
      campo={campo ? campo : "idDashboard"}
      label={label ? label : "Dashboard"}
      icono="fas fa-chart-line"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
      esForm={false}
    />
  );
}
