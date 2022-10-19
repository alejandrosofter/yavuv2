import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloPrestaciones";
import Form from "@components/prestaciones/_form";
export default function SelectPrestaciones({
  multiple,
  label,
  campo,
  callbackchange,
  obraSocial,
}) {
  console.log(`obrasSociales/${obraSocial}/prestaciones`);
  return (
    <SelectUserModColeccion
      coleccion={`obrasSociales/${obraSocial}/prestaciones`}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idPrestacion"}
      label={label ? label : "Prestacion"}
      icono="fas fa-medical"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.nombre} - ${item.codigoInterno}`}
    />
  );
}
