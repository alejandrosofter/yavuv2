import { Grid, Typography } from "@mui/material";
import SlideSocios from "./slideSocios";
import BuscadorSociosInput from "./_buscador";

export default function FiltroSocios({ callBackCambia, mod, seleccion }) {
  return (
    <Grid container>
      <Grid item md={9}>
        <SlideSocios
          mod={mod}
          seleccion={seleccion}
          callBackCambia={callBackCambia}
        />
      </Grid>
      <Grid item md={3}>
        <BuscadorSociosInput callBackCambia={callBackCambia} />
      </Grid>
    </Grid>
  );
}
