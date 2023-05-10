import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloMedicamentos";
import Form from "@pages/medicamentos/_form";
export default function SelectMedicamentos({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"medicamentos"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      extraData={["importe"]}
      multiple={multiple}
      campo={campo ? campo : "idMedicamento"}
      label={label ? label : "Medicamento"}
      icono="fas fa-book-medical"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) =>
        `${item.nombre} ${
          item.label_idAccionTerapeutica
            ? `(${item.label_idAccionTerapeutica})`
            : ""
        } ${item.laboratorio ? item.laboratorio : ""}`
      }
    />
  );
}
