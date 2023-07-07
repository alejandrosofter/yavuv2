import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import RichEditor from "@components/forms/richEditorFormik";
import RichEditorFormik from "@components/forms/richEditorFormik";
export default function Form({ setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={12}>
        <Typography variant="caption">
          Variables disponibles {`{{paciente.nombre}}`},
          {`{{paciente.apellido}}`},{`{{paciente.dni}}`},
          {`{{paciente.domicilio}}`},{`{{paciente.telefono}}`},
          {`{{paciente.email}}`}
        </Typography>
        <Input label="Detalle" multiline={true} rows={10} campo="detalle" />
      </Grid>
    </Grid>
  );
}
