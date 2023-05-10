import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import SelectFormik from "../../forms/select";

export default function FormItemMovimientoCuenta({ mod, errors }) {
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item md={5}>
          <SelectFormik
            campo="tipo"
            label="Tipo Item"
            lista={mod.config.itemsTipos}
            campoLabel="detalle"
            campoId="id"
          />
        </Grid>
        <Grid item md={6}>
          <Input campo="importe" label="Importe" />
        </Grid>
        <Grid item md={12}>
          <Input campo="detalle" label="Detalle" />
        </Grid>
      </Grid>
    </Grid>
  );
}
