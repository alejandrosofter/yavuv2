import { Grid, IconButton, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function Form({ setFieldValue, values }) {
  return (
    <Grid sx={{ p: 2 }} container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>

      <Grid item md={10}>
        <Input label="Detalle " campo="detalle" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          disabled={true}
          items={["COBRO", "DEUDA", "MENSUALIZACION", "MANUAL"]}
          label="Tipo"
          campo="tipo"
        />
      </Grid>
      <Grid item md={2}>
        <Input label="$ Total" campo="importeTotal" />
      </Grid>
    </Grid>
  );
}
