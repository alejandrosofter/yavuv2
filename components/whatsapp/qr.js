import { getFechaString } from "@helpers/dates";
import { Button, Grid, Typography } from "@mui/material";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import QRCode from "react-qr-code";

export default function QrWhatsapp({ dataSesion }) {
  if (!dataSesion) return "";
  if (dataSesion.estado === "ESPERANDO ESCANEO APP")
    return (
      <Grid container>
        <Grid item md={12}>
          <QRCode value={dataSesion.qr} />
        </Grid>
      </Grid>
    );
  return "";
}
