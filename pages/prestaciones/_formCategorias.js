import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid sx={{ pt: 1, pb: 1 }} md={12} container rowSpacing={2} spacing={2}>
      <Grid item md={10}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={12}>
        <Typography variant="caption"></Typography>
      </Grid>
    </Grid>
  );
}
