import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import SelectPrestacion from "@pages/prestaciones/selectPrestacion";

export default function FormularioItemActividad({ obraSocial, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={5}>
        <SelectPrestacion idObraSocial={obraSocial} />
      </Grid>
    </Grid>
  );
}
