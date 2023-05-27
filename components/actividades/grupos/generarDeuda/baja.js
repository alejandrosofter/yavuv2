import Dialogo from "@components/forms/dialogo";
import { Button, Grid, Typography } from "@mui/material";
export default function BajaGeneracionDeuda({ open, setOpen, data }) {
  return (
    <Dialogo fullWidth={true} maxWidth="sm" open={open} setOpen={setOpen}>
      <Grid container>
        <Grid item md={9}>
          <Typography variant="h6" gutterBottom>
            BAJA DE GENERACION DEUDA
          </Typography>
        </Grid>
      </Grid>
    </Dialogo>
  );
}
