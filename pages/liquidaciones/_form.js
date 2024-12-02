import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";

export default function Form({ mod, setFieldValue, values }) {
  const callbackacepta = (values) => {};
  return (
    <Grid spacing={2} container>
      {/* <Grid item md={3}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid> */}
      <Grid item md={9}>
        <Input label="Ente Facturador" campo="label_idEnteFacturador" />
      </Grid>
      <Grid item md={3}>
        <Input label="Cantidad Items" campo="cantidadItems" />
      </Grid>

      <Grid item md={3}>
        <Input label="Importe Total" campo="importeTotal" />
      </Grid>
    </Grid>
  );
}
