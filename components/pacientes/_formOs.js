import { Grid } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
export default function FormOs() {
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <Input label="Nro Afiliado" campo="nroAfiliado" />
      </Grid>
      <Grid item md={3}>
        <Input label="Nro Credencial" campo="nroCredencial" />
      </Grid>
      <Grid item md={4}>
        <SelectObraSocial />
      </Grid>
      {/* <Grid item md={3}>
        <Switch label="Default" campo="default" />
      </Grid> */}
    </Grid>
  );
}
