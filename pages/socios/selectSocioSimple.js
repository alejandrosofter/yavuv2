import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloSocios";
import Form from "@components/socios/_formSocios";
export default function SelectSocioSimple({ label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"socios"}
      Modelo={Modelo}
      limit={50}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idSocio"}
      label={label ? label : "Socio"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.nombre} ${item.apellido}`}
    />
  );
}
