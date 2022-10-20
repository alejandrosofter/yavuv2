import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import RichEditor from "@components/forms/richEditorFormik";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={12}>
        <Input rows={10} multiline={true} label="Descripcion" campo="detalle" />
      </Grid>
    </Grid>
  );
}
