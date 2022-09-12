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
import SelecListeningData from "./selectListening";
import SelectData from "./selectData";
import FormData from "./_formData";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={2}>
        <Input label="Coleccion" campo="coleccion" />
      </Grid>
      <Grid item md={2}>
        <Input label="Path" campo="path" />
      </Grid>
      <Grid item md={3}>
        <SelectData Form={FormData} label="Data Save" campo="dataSave" />
      </Grid>
      <Grid item md={2}>
        <Input label="Campo Order" campo="campoOrder" />
        <Typography variant="caption">
          ** Importante para poder realizar el recorrido de los datos (solo para
          CHECK TODOS)
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Input label="Wheres" campo="wheres" />
        <Typography variant="caption">
          ** Importante para poder realizar el recorrido de los datos (solo para
          CHECK TODOS)
        </Typography>
      </Grid>

      {/* <Grid item md={3}>
        <Switch label="Comienza Acumulado" campo="comienzaAcumulado" />
        <Typography variant="caption">
          ** Al seleccionar esta opcion, se comenzara el periodo con el conteo
          total historico
        </Typography>
      </Grid> */}

      <Grid item md={2}>
        <SelectEstaticFormik
          items={["ANUAL", "MENSUAL", "DIARIO"]}
          campo="tipoPeriodo"
          label="Tipo Periodo"
        />
      </Grid>
      <Grid item md={2}>
        <Input label="Campo Valor" campo="campoValue" />
      </Grid>
      <Grid item md={2}>
        <Input label="Campo Label" campo="campoLabel" />
      </Grid>
      <Grid item md={2}>
        <Input label="Campo Fecha" campo="campoFecha" />
        <Typography variant="caption">
          ** PARA SACAR PERIDO, Si no se selecciona nada, se pone fecha del dia
        </Typography>
      </Grid>
      <Grid item md={4}>
        <SelecListeningData label="Listening Padre" campo="idListeningPadre" />
      </Grid>

      {/* <Grid item md={2}>
        <Switch label="Tiene Condicion" campo="tieneCondicion" />
      </Grid>
      {values.tieneCondicion && (
        <Grid item md={8}>
          <Input label="Condicion" campo="condicion" />
        </Grid>
      )} */}

      <Grid item md={12}>
        <Input label="On Create (operacion asignacion)" campo="onCreate" />
      </Grid>
      <Grid item md={12}>
        <Input label="On Delete (operacion asignacion)" campo="onDelete" />
      </Grid>
      <Grid item md={12}>
        <Input label="On Update (operacion asignacion)" campo="onUpdate" />
      </Grid>
      <Grid item md={4}>
        <Input label="Acumulado TOTAL" campo="acumulado" />
      </Grid>

      {/* <Grid item md={12}>
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
                      width: 150,
                    },

                    {
                      field: "asignacion",
                      headerName: "Asignacion",
                      width: 100,
                    },
                    {
                      field: "esCampoArray",
                      headerName: "Campo Array",
                      width: 100,
                      renderCell: (params) => (params.value ? "SI" : "NO"),
                    },
                    { field: "condicion", headerName: "Condicion", width: 380 },
                  ]}
                />
              ),
            },
            {
              label: "Campos Items Salida",
              nro: 1,
              hide: true,
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
      </Grid> */}
    </Grid>
  );
}
