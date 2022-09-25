import { Grid, Stack } from "@mui/material";
import Input from "../forms/input";
import Switch from "../forms/switch";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid sx={{ pt: 1, pb: 1 }} md={12} container rowSpacing={2} spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <Input label="Coleccion" campo="coleccion" />
      </Grid>
      <Grid item md={2}>
        <Input label="Campo Order (coleccion)" campo="campoOrder" />
      </Grid>
      <Grid item md={2}>
        <Switch label="Es Number?" campo="orderIsNumber" />
      </Grid>
      <Grid item md={2}>
        <Input label="Cantidad Lote" campo="cantidadLote" />
      </Grid>
      <Grid item md={5}>
        <Input label="Wheres (eval)" campo="wheres" />
      </Grid>

      <Grid item md={2}>
        <SelectEstaticFormik
          items={[
            "ALGOLIACBU",
            "MENSUALIZADOSCHECK",
            "IMPORTBIGQUERY",
            "EXPORTSOCIOBQ",
          ]}
          label="TOPIC NAME"
          campo="topicName"
        />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "PROCESADO", "PROCESANDO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
    </Grid>
  );
}
