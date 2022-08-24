import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

export default function FormTipoSocios({
  dataModulo,
  modelo,
  clickAceptar,
  valoresIniciales,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input campo="nombre" label="Nombre" />
      </Grid>
      <Grid item md={6}>
        <Input campo="proximoNro" label="Proximo Nro" />
      </Grid>
    </Grid>
  );
}
