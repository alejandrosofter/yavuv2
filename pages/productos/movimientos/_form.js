import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectProfesor from "@pages/profesores/select";
import SelectFecha from "@components/forms/selectorFecha";
import ColeccionTable from "@components/forms/coleccionTable";
export default function FormGrupo({ mod, setFieldValue, values, producto }) {
  return (
    <Grid container sx={{ p: 2 }} rowSpacing={2} spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={8}>
        <Input label="Cliente/Proveedor" campo="label_cliente" />
      </Grid>
      <Grid item md={2}>
        <Input label="Cantidad" campo="cantidad" />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
