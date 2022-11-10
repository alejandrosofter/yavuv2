import FilterGenerico from "@components/filterGenerico";
import SelectFecha from "@components/forms/selectorFecha";
import { Grid } from "@mui/material";

export default function FiltroInformeCobros({
  callbackBuscar,
  valoresIniciales,
}) {
  return (
    <FilterGenerico
      icon="fas fa-search"
      callbackSuccess={callbackBuscar}
      valoresIniciales={valoresIniciales}
    >
      <Grid container>
        <Grid item md={2}>
          <SelectFecha label="Desde" campo="fechaDesde" />
        </Grid>
        <Grid item md={2}>
          <SelectFecha label="Hasta" campo="fechaHasta" />
        </Grid>
      </Grid>
    </FilterGenerico>
  );
}
