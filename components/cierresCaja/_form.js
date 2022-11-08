import { Grid, Typography } from "@mui/material";
import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import SelectFormaPago from "@components/formaPagos/selectFormaPago";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function FormMensualizado({ values, setFieldValue }) {
  return (
    <Grid container sx={{ p: 2 }} spacing={2}>
      <Grid item md={12}>
        <Typography variant="caption">
          ** IMPORTANTE: es importante la fecha, ya que buscara todos los pagos
          que se hayan realizado en esa fecha
        </Typography>
      </Grid>
      <Grid item md={3}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "OK", "FACTURADO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={6}>
        <Input label="Detalle (opcional) " campo="detalle" />
      </Grid>
    </Grid>
  );
}
