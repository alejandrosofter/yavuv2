import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import QrWhatsapp from "./qr";
import StatusWhatsapp from "./status";
import TestMessage from "./testMesage";

export default function WhatsApp() {
  const [dataSesion, setDataSesion] = useState();
  const cambiaSesion = (sesion) => {
    setDataSesion(sesion);
  };
  return (
    <Grid container>
      <Grid item md={12}>
        <StatusWhatsapp onchangeSession={cambiaSesion} />
        <QrWhatsapp dataSesion={dataSesion} />
        <TestMessage />
      </Grid>
    </Grid>
  );
}
