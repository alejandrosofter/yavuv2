import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, {
  valoresIniciales,
} from "@modelos/ModeloCertificadosElectronicos";
import Form from "@components/certificadosElectronicos/_form";
import { getFechaString } from "@helpers/dates";
export default function Modulo({ multiple, label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"certificadosElectronicos"}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      //   multiple={multiple}
      campo={campo ? campo : "idCertificadoElectronico"}
      label={label ? label : "Certificado Electronico"}
      //   icono="fas fa-shopping-cart"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => {
        return item.cuit + " - " + getFechaString(item.fechaVto);
      }}
    />
  );
}
