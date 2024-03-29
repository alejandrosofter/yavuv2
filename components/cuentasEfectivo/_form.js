import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";

export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid>
      <Stack>
        <Grid
          sx={{ pt: 1, pb: 1 }}
          md={12}
          container
          rowSpacing={2}
          spacing={2}
        >
          <Grid item md={4}>
            <Input label="Nombre" campo="nombre" />
          </Grid>
          <Grid item md={4}>
            <Input label="Detalle" campo="detalle" />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
