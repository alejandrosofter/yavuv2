import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectProducto from "@components/productos/selectProducto";
export default function FormActividad({ mod, setFieldValue, values }) {
  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item md={6}>
        <Input label="Nombre Actividad" campo="nombreActividad" />
      </Grid>

      <Grid item md={4}>
        <SelectEstaticFormik
          items={["ACTIVA", "RECESO", "SUSPENDIDA"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={6}>
        <SelectProducto />
      </Grid>
      <Grid item md={6}>
        <Input rows={3} multiline={true} label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
