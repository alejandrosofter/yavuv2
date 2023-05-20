import ModeloOrigenesDatos, {
  valoresInicialesRelaciones,
  valoresIniciales,
} from "../../../modelos/ModeloOrigenesDatos";
import ItemsModulo from "@components/forms/itemsModulo";
import _FormItemRelacion from "./_formItemRelacion";
import { Formik, Form } from "formik";
import { useEffect } from "react";
export default function ItemsRelaciones({ datosExternos }) {
  const [valores, setValores] = useState();
  useEffect(() => {
    const aux = valores.relaciones ? valores.relaciones : [];

    aux.push(datosExternos);
    setFieldValue(aux);
  }, [datosExternos, valores]);
  return (
    <Formik
      initialValues={valoresIniciales()}
      validationSchema={ModeloOrigenesDatos()}
      onSubmit={clickForm}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={true}
    >
      {({ handleSubmit, values, errors, setFieldValue, validateForm }) => {
        setValores(values);
        return (
          <Form onSubmit={handleSubmit}>
            <ItemsModulo
              campo="relaciones"
              data={values.relaciones}
              setFieldValue={setFieldValue}
              modelo={ModeloOrigenesDatos().fields.relaciones.innerType}
              nombreModulo="RELACIONES"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las acciones de esta accion:`}
              textoAgregar={`Ingrese los datos de la accion`}
              valoresIniciales={valoresInicialesRelaciones()}
              form={<_FormItemRelacion />}
              dataModulo={[]}
              columnas={[
                {
                  field: "desdeCampo",
                  headerName: "Nombre",
                  editable: false,
                  width: 100,
                },

                {
                  field: "hastaCampo",
                  headerName: "Label",
                  editable: false,
                  width: 80,
                },

                {
                  field: "funcionCorreccion",
                  headerName: "Funcion Correccion",
                  editable: false,
                  width: 180,
                },
              ]}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
