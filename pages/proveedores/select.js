import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloProveedores";
import Form from "@pages/proveedores/_form";
export default function SelectProveedor({
  label,
  campo,
  callbackchange,
  parentData,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"proveedores"}
      Modelo={Modelo}
      parentData={parentData}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idProveedor"}
      label={label ? label : "Proveedor"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel="razonSocial"
    />
  );
}
