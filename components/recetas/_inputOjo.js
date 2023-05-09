import { Grid, Typography } from "@mui/material";
import SelectOpcionesAnteojos from "./selectOpcionesAnteojos";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
export default function InputOjo({ label, campo, values }) {
  return (
    <Grid container>
      <Grid item md={12}>
        <Typography variant="h5">{label}</Typography>
      </Grid>

      <Grid item md={3}>
        <Switch label={"Es Neutro?"} campo={`esNeutro_${campo}`} />
      </Grid>

      {!values[`esNeutro_${campo}`] && (
        <Grid item spacing={1} md={9} container>
          <Grid item md={3}>
            <Input label="Esfera" campo={`esfera_${campo}`} />
          </Grid>

          <Grid item md={3}>
            <Input label="Eje" campo={`eje_${campo}`} />
          </Grid>
          <Grid item md={3}>
            <Input label="Cilindro" campo={`cilindro_${campo}`} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
