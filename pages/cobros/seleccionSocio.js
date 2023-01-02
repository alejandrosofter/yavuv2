import { Grid } from "@mui/material";
import BuscadorSociosInput from "@components/socios/_buscador";

export default function Modulo({ callBackCambia }) {
  return (
    <Grid md={12}>
      <BuscadorSociosInput callBackCambia={callBackCambia} />
    </Grid>
  );
}
