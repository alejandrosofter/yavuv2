import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

export default function FormTipoDocumentacionSocios({}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input campo="nombreTipoDocumentacion" label="Tipo Documentacion" />
      </Grid>
    </Grid>
  );
}
