import { QueryApi } from "@helpers/queryApi";
import { Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
import QrWhatsapp from "./qr";
export default function CreateSessionWhatsapp({ dataSesion }) {
  const [loading, setLoading] = useState();
  const { add } = useCollection(
    `whatsapp/${fuego.auth().currentUser?.uid}/session`,
    { listen: true }
  );
  const { data } = useDocument(`whatsapp/${fuego.auth().currentUser?.uid}`, {
    listen: true,
  });
  const newSession = async () => {
    const data = {
      estado: "LOGIN",
      idUsuario: fuego.auth().currentUser?.uid,
      fecha: new Date(),
    };
    add(data);
  };
  const newLogout = async () => {
    const data = {
      estado: "LOGOUT",
      idUsuario: fuego.auth().currentUser?.uid,
      fecha: new Date(),
    };
    add(data);
  };
  if (!data) return "cargando...";
  return (
    <Grid container>
      <Grid item md={6}>
        <QrWhatsapp dataSesion={dataSesion} />
      </Grid>
      <Grid item md={6}>
        <Button disabled={loading} onClick={newSession} variant="outlined">
          LOGIN
        </Button>
        <Button disabled={loading} onClick={newLogout} variant="outlined">
          LOGOUT
        </Button>
      </Grid>
    </Grid>
  );
}
