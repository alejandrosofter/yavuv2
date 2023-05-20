import { getCuentaFirestore } from "@helpers/db";
import { Grid, Typography, Icon } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import Ayuda from "./ayuda";

export default function DashboardInit() {
  const usuarioCuenta = getCuentaFirestore();

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography variant="h3" gutterBottom>
          <Icon fontSize="5px" className="fas fa-hand-peace" />
          Bienvenido a YAVU!
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography variant="body" gutterBottom>
          Estas usando la cuenta {fuego.auth().currentUser?.email}, y tiene el
          plan asignado.
        </Typography>
      </Grid>
      <Grid item md={4}>
        {usuarioCuenta && <Ayuda idPlan={usuarioCuenta.plan} />}
      </Grid>
    </Grid>
  );
}
