import { Grid } from "@mui/material";
import FormItem from "./_formItem";
import Input from "@components/forms/input";
import { ModeloItems, valoresInicialesItems } from "@modelos/ModeloDashboard";
import ItemsModulo from "@components/forms/itemsModulo";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function Form({ setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={4}>
        <Input label="Nombre" campo="nombre" />
      </Grid>

      <Grid item xs={12}>
        <ItemsModulo
          setFieldValue={setFieldValue}
          campo="items"
          data={values?.items}
          modelo={ModeloItems}
          nombreModulo="ITEMS"
          fullWidth={true}
          maxWidth={"md"}
          textoEditar={`Puedes cambiar los items:`}
          textoAgregar={`Ingrese los datos del item`}
          valoresIniciales={valoresInicialesItems}
          form={<FormItem />}
          dataModulo={[]}
          columnas={[
            {
              field: "nombre",
              headerName: "Nombre",
              editable: false,
              width: 200,
            },

            {
              field: "label_idEstadistica",
              headerName: "Estadistica",
              editable: false,
              width: 280,
            },
            {
              field: "size",
              headerName: "Size",
              editable: false,
              width: 100,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
