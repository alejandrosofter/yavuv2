import ItemsModulo from "../../../forms/itemsModulo";
import Form from "../../../socios/actividades/_formActividades";
import { getFechaString } from "../../../../helpers/dates";
import {
  ModeloActividades,
  valoresInicialesActividades,
} from "../../../../modelos/ModeloSocios";
import { cols } from "../../../socios/actividades/index";
export default function Modulo({ mod, setFieldValue, values }) {
  const field = "actividades";
  const label = "ACTIVIDADES";

  return (
    <ItemsModulo
      labelBtnAgregar="ASIGNAR ACTIVIDAD"
      setFieldValue={setFieldValue}
      campo={field}
      data={values[field]}
      modelo={ModeloActividades}
      nombreModulo={label}
      fullWidth={true}
      maxWidth={"md"}
      textoEditar={`Puedes cambiar las acciones del registro:`}
      textoAgregar={`Ingrese los datos del registro`}
      valoresIniciales={valoresInicialesActividades}
      form={<Form mod={mod} />}
      dataModulo={[]}
      columnas={cols}
    />
  );
}
