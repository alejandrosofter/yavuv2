import { Grid } from "@mui/material";
import Switch from "@components/forms/switch";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export function EmailConfig({}) {
  return (
    <Grid sx={{ pt: 3 }} md={12} container rowSpacing={2} spacing={2}>
      <Grid item xs container sx={{ ml: 1 }} md={9} spacing={2}>
        <Grid item md={6}>
          <Input label="Usuario" campo="user" />
        </Grid>
        <Grid item md={4}>
          <Input label="Clave " campo="password" />
        </Grid>
        <Grid item md={3}>
          <SelectEstaticFormik
            label="Tipo"
            items={["GMAIL", "SMTP"]}
            campo="service"
          />
        </Grid>
        <Grid item md={7}>
          <Input label="Host" campo="host" />
        </Grid>
        <Grid item md={6}>
          <Input label="Puerto " campo="port" />
        </Grid>

        <Grid item md={4}>
          <Switch label="Seguridad " campo="secure" />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default function Module() {
  return "...";
}
