import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { Typography } from "@mui/material";
export default function ConfigForm({ values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <Input campo="porcentajeEnvio" label="% Envio" />
      </Grid>
      <Grid item md={3}>
        <Input campo="porcentajeGanancia" label="% Ganancia" />
      </Grid>
      <Grid item md={3}>
        <Input campo="porcentajeImpuestos" label="% Impuestos" />
        <Typography variant="caption" color="textSecondary">
          Impuesto de medios de pago, otros impuestos etc.
        </Typography>
      </Grid>
      <Grid item md={3}></Grid>

      {/* ({elemento})=>`${elemento.apellido} ${elemento.nombre}` */}
    </Grid>
  );
}
