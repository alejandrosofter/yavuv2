import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
export default function FormTarea({ setFieldValue, values }) {
  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha Busca" campo="fechaBusca" />
      </Grid>

      <Grid item md={6}>
        <Input label="Detalle" campo="detalle" />
      </Grid>

      <Grid item md={2}>
        <Input label="Tipo Tarea" campo="tipoTarea" />
      </Grid>

      <Grid item md={4}>
        <SelectEstaticFormik
          items={["PENDIENTE", "EJECUTADA"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
    </Grid>
  );
}
