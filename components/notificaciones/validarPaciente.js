import DialogContenido from "@components/forms/dialogContenido";
import { Grid, Typography } from "@mui/material";

import parse from "html-react-parser";

export function NotificaValidaPaciente({ open, setOpen, notificacion }) {
  const mensaje = Array.isArray(notificacion?.mensaje.MensajeDisplay)
    ? notificacion?.mensaje.MensajeDisplay.join(" ")
    : notificacion?.mensaje.MensajeDisplay;
  return (
    <DialogContenido open={open} setOpen={setOpen} title="Validar Paciente">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" color="primary">
            {notificacion?.titulo}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="primary">
            {/* parse MensajeDisplay  */}
            {notificacion?.mensaje.MensajeDisplay ? parse(mensaje) : ""}
          </Typography>
          <Typography variant="caption">
            Paciente {notificacion?.data?.apellido} {notificacion?.data?.nombre}{" "}
            con DNI {notificacion?.data?.dni}, NRO AFILIADO{" "}
            {notificacion?.data?.nroAfiliado} y O.S.{" "}
            {notificacion?.data?.label_obraSocial}
          </Typography>
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
