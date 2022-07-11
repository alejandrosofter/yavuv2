import { Grid, Stack, Typography } from "@mui/material";
import Input from "../forms/input";
import FormCampo from "./_formCampos";
import FormCampoSalida from "./_formCampoSalida";
import Switch from "@components/forms/switch";
import {
  ModeloCampos,
  valoresInicialesCampos,
} from "@modelos/ModeloListeningData";
import ItemsModulo from "@components/forms/itemsModulo";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import TabsFormik from "@components/forms/tab";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={3}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={2}>
        <Input label="Coleccion" campo="coleccion" />
      </Grid>
      <Grid item md={2}>
        <Input label="Campo Order" campo="campoOrder" />
        Importante para poder realizar el recorrido de los datos
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["MENSUAL", "DIARIO", "ANUAL"]}
          label="Periodicidad"
          campo="periodicidad"
        />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <Switch label="Comienza con Historico" campo="comienzaHistorico" />
        <Typography variant="caption">
          Al seleccionar esta opcion, se comenzara el periodo con el conteo
          total
        </Typography>
      </Grid>
      <Grid item md={12}>
        <TabsFormik
          label=""
          vistas={[
            {
              label: "Campos",
              nro: 0,
              vista: (
                <ItemsModulo
                  setFieldValue={setFieldValue}
                  campo="campos"
                  data={values.campos}
                  modelo={ModeloCampos}
                  nombreModulo="CAMPOS"
                  fullWidth={true}
                  maxWidth={"md"}
                  valoresIniciales={valoresInicialesCampos()}
                  form={<FormCampo mod={mod} />}
                  dataModulo={[]}
                  columnas={[
                    {
                      field: "nombre",
                      headerName: "Nombre",
                      editable: false,
                      width: 200,
                    },

                    {
                      field: "asignacion",
                      headerName: "Asignacion",
                      width: 100,
                    },
                    { field: "condicion", headerName: "Condicion", width: 380 },
                  ]}
                />
              ),
            },
            {
              label: "Campos Items Salida",
              nro: 1,
              vista: (
                <ItemsModulo
                  setFieldValue={setFieldValue}
                  campo="camposSalida"
                  data={values.camposSalida}
                  modelo={ModeloCampos}
                  nombreModulo="CAMPOS SALIDA"
                  fullWidth={true}
                  maxWidth={"md"}
                  valoresIniciales={valoresInicialesCampos()}
                  form={<FormCampoSalida mod={mod} />}
                  dataModulo={[]}
                  columnas={[
                    {
                      field: "nombre",
                      headerName: "Nombre",
                      editable: false,
                      width: 200,
                    },

                    {
                      field: "valor",
                      headerName: "Valor",
                      width: 400,
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
