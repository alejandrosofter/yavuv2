import { Grid, Typography, Icon } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";

export default function Modulo({ mod }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography variant="caption" gutterBottom>
          <Icon sx={{ fontSize: 12 }} className="fas fa-hand-point-up" />
          Al boton (tipo hamburguesa) tienes los modulos que puedes operar!
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography variant="h3" gutterBottom>
          <Icon fontSize="5px" className="fas fa-hand-peace" />
          Bienvenido al sistema SOCIOS!
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography variant="body" gutterBottom>
          Estas usando la cuenta {fuego.auth().currentUser?.email}, y tiene el
          plan asignado.
        </Typography>
      </Grid>
    </Grid>
  );
}
