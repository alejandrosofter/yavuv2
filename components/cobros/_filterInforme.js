import FilterGenerico from "@components/filterGenerico";
import SelectFecha from "@components/forms/selectorFecha";
import { LoadingButton } from "@mui/lab";
import { Grid, Icon } from "@mui/material";

export default function FiltroInformeCobros({
  callbackBuscar,
  valoresIniciales,
}) {
  return (
    <FilterGenerico
      icon="fas fa-search"
      callbackSuccess={callbackBuscar}
      hideSubmit={true}
      valoresIniciales={valoresIniciales}
    >
      <Grid spacing={2} container>
        <Grid item md={2}>
          <SelectFecha label="Desde" campo="fechaDesde" />
        </Grid>
        <Grid item md={2}>
          <SelectFecha label="Hasta" campo="fechaHasta" />
        </Grid>
        <Grid item md={2}>
          <LoadingButton variant="contained" type="submit">
            <Icon sx={{ mr: 2 }} className={"fas fa-scroll"} /> Descarga
          </LoadingButton>
        </Grid>
      </Grid>
    </FilterGenerico>
  );
}
