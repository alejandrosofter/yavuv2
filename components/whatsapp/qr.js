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
          <Typography variant="h6">({dataSesion.estado})</Typography>
          <Typography variant="caption">
            Debes scanear con la app del celular que quieras asociar con el
            sistema YAVU
          </Typography>
        </Grid>
        <Grid item md={12}>
          <QRCode value={dataSesion.qr} />
        </Grid>
      </Grid>
    );
  return "";
}
