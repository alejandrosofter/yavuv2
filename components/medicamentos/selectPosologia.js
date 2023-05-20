import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import {
  valoresInicialesPosologia,
  ModeloPosologias,
} from "@modelos/ModeloMedicamentos";
import Form from "@components/medicamentos/_formPosologias";
export default function SelectPosologias({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"posologias"}
      Modelo={ModeloPosologias}
      parentData={true}
      valoresIniciales={valoresInicialesPosologia}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idPosologia"}
      label={label ? label : "Posologia"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) =>
        `${item.cantidad} ${item.presentacion} cada ${item.hrs} hrs`
      }
    />
  );
}
