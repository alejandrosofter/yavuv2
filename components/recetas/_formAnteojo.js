import { Grid, Icon, Typography } from "@mui/material";
import InputOjo from "./_inputOjo";
import Switch from "@components/forms/switch";
import SelectOpcionesAnteojos from "./selectOpcionesAnteojos";
import Input from "@components/forms/input";
export function FormAnteojo({
  values,
  campo,
  label,
  agregaCamposAdicion = false,
}) {
  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Switch
          sx={{ fontSize: 15 }}
          campo={`select_${campo}`}
          label={
            <Typography variant="h6">
              <Icon className="fas fa-eye" /> {label}
            </Typography>
          }
        />
      </Grid>
      <Switch
        sx={{ fontSize: 15 }}
        campo={`selectAmbos_${campo}`}
        label={`Ambos Ojos`}
      />
      {values[`select_${campo}`] && (
        <>
          {!values[`selectAmbos_${campo}`] && (
            <>
              <Grid item md={12}>
                <InputOjo
                  label="Ojo Derecho"
                  values={values}
                  campo={`derecho_${campo}`}
                />
              </Grid>
              <Grid item md={12}>
                <InputOjo
                  label="Ojo Izquierdo"
                  values={values}
                  campo={`izquierdo_${campo}`}
                />
              </Grid>
            </>
          )}

          {values[`selectAmbos_${campo}`] && (
            <>
              <Grid item md={12}>
                <InputOjo
                  label="Ambos Ojos"
                  values={values}
                  campo={`ambos_${campo}`}
                />
              </Grid>
              <Grid item md={4}>
                <Switch
                  label={`Agrega Adicion`}
                  campo={`agregaAdicion_${campo}`}
                />
              </Grid>
              {values[`agregaAdicion_${campo}`] && (
                <>
                  <Grid item md={2}>
                    <Input label="Adicion" campo={`adicion_${campo}`} />
                  </Grid>
                  <Grid item md={2}>
                    <Input label="Esf." campo={`esfera_${campo}`} />
                  </Grid>
                </>
              )}
            </>
          )}
        </>
      )}
    </Grid>
  );
}
export default function Module() {
  return "...";
}
