import ItemsModulo from "@components/forms/itemsModulo";
import Form from "@pages/socios/promociones/_form";
import {
  ModeloPromociones,
  valoresInicialesPromocion,
} from "@modelos/ModeloSocios";
import { cols } from "@pages/socios/promociones";
export default function Modulo({ mod, setFieldValue, values }) {
  const field = "promociones";
  const label = "PROMOCIONES";

  return (
    <ItemsModulo
      labelBtnAgregar="ASIGNAR PROMOCION"
      setFieldValue={setFieldValue}
      campo={field}
      data={values[field]}
      modelo={ModeloPromociones}
      nombreModulo={label}
      fullWidth={true}
      maxWidth={"md"}
      textoEditar={`Puedes cambiar las acciones del registro:`}
      textoAgregar={`Ingrese los datos del registro`}
      valoresIniciales={valoresInicialesPromocion}
      form={<Form mod={mod} />}
      dataModulo={[]}
      columnas={cols}
    />
  );
}
