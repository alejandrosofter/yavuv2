import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

import SelectFormaPago from "@pages/formaPagos/selectFormaPago";

export default function FormularioItemPago({}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <SelectFormaPago />
      </Grid>
      <Grid item md={3}>
        <Input campo="importe" label="Importe" />
      </Grid>
    </Grid>
  );
}
