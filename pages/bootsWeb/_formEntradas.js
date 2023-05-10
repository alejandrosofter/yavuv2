import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

export default function FormItem({ mod }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={5}>
        <Input campo="nombre" label="Nombre" />
      </Grid>
    </Grid>
  );
}
