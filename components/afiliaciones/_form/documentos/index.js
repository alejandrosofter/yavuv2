import ItemsModulo from "@components/forms/itemsModulo";
import Form from "@components/socios/documentos/_formDocumentos";
import { getFechaString } from "@helpers/dates";
import {
  ModeloDocumentos,
  valoresInicialesDocumentacion,
} from "@modelos/ModeloSocios";
import { cols } from "@components/socios/documentos/index";
export default function Modulo({ setFieldValue, values }) {
  const field = "documentos";
  const label = "DOCUMENTOS";
  return (
    <ItemsModulo
      setFieldValue={setFieldValue}
      campo={field}
      data={values[field]}
      modelo={ModeloDocumentos}
      nombreModulo={label}
      fullWidth={true}
      maxWidth={"md"}
      textoEditar={`Puedes cambiar las acciones del registro:`}
      textoAgregar={`Ingrese los datos del registro`}
      valoresIniciales={valoresInicialesDocumentacion}
      form={<Form />}
      dataModulo={[]}
      columnas={cols}
    />
  );
}
