import { Grid, Stack } from "@mui/material";
import Input from "../forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectProducto from "@components/productos/selectProducto";
import SelectActividadPadre from "@components/actividades/selectActividadPadre";
export default function FormActividad({ mod, setFieldValue, values }) {
  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["ACTIVA", "RECESO", "SUSPENDIDA"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <Input label="Nombre Actividad" campo="nombreActividad" />
      </Grid>

      <Grid item md={2}>
        <SelectActividadPadre label="Actividad Padre" />
      </Grid>
      <Grid item md={5}>
        <SelectProducto label="Obligacion Mensual" />
      </Grid>
      <Grid item md={12}>
        <Input rows={3} multiline={true} label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
