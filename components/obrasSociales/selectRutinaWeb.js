import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloObrasSociales";
import Form from "@components/obrasSociales/_form";
export default function SelectRutinasWebObraSocial({
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"obrasSociales_rutinasWeb"}
      //   Modelo={Modelo}
      //   valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      hideABM={true}
      allData={true}
      campo={campo ? campo : "rutinaWeb"}
      label={label ? label : "Rutina WEB"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel="nombreObraSocial"
    />
  );
}
