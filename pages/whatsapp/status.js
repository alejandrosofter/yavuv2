import { QueryApi } from "@helpers/queryApi";
import { Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
import QrWhatsapp from "./qr";
export default function StatusWhatsapp({ onchangeSession }) {
  const [dataConsulta, setDataConsulta] = useState();
  const [loading, setLoading] = useState();
  const [clickLogin, setClickLogin] = useState();
  const [clickLogout, setClickLogout] = useState();
  const { data: dataSesion } = useDocument(
    `whatsapp/${fuego.auth().currentUser?.uid}`,
    { listen: true }
  );

  const { add } = useCollection(
    `whatsapp/${fuego.auth().currentUser?.uid}/session`,
    { listen: true }
  );
  const newSession = async () => {
    const data = {
      estado: "LOGIN",
      idUsuario: fuego.auth().currentUser?.uid,
      fecha: new Date(),
    };
    add(data);
    setClickLogin(true);
  };
  const newLogout = async () => {
    const data = {
      estado: "LOGOUT",
      idUsuario: fuego.auth().currentUser?.uid,
      fecha: new Date(),
    };
    setClickLogout(true);
    add(data);
  };
  useEffect(() => {
    if (onchangeSession) onchangeSession(dataSesion);
    if (dataSesion && !dataSesion.sessionSave) setClickLogin(false);
  }, [dataSesion]);
  const checkEstado = () => {
    const data = { idUsuario: fuego.auth().currentUser?.uid };
    setDataConsulta({ url: "/api/whatsapp/checkEstado", data });
  };

  if (!dataSesion) return "cargando...";
  if (dataSesion.estado === "ESPERANDO ESCANEO APP")
    return <QrWhatsapp dataSesion={dataSesion} />;
  if (dataSesion.estado === "LOGOUT" || !dataSesion.exists)
    return (
      <Grid container>
        <Grid item md={12}>
          <Typography variant="h6">
            {!dataSesion.exists ? "SIN SESION" : dataSesion.estado} | No hay
            sesion
          </Typography>
          <Typography variant="caption">
            Debes hacer clieck en LOGIN y luego escanear con la app del celular
            que quieras asociar con el sistema YAVU
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Button disabled={clickLogin} onClick={newSession} variant="outlined">
            LOGIN
          </Button>
        </Grid>
      </Grid>
    );
  if (dataSesion.estado === "LISTO")
    return (
      <Grid spacing={2} container>
        <Grid item md={12}>
          <Typography variant="h6">({dataSesion.estado}) </Typography>
          <Typography variant="caption">
            {" "}
            AUTENTICADO EL {getFechaString(dataSesion.fechaAutentica)} ESTADO
            SESION: {dataSesion.sessionSave ? "GUARDADA" : "SIN GUARDAR"}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Button disabled={clickLogout} onClick={newLogout} variant="outlined">
            LOGOUT
          </Button>
        </Grid>
        <QueryApi
          callbackLoading={(loading) => setLoading(loading)}
          backdropActive={false}
          dataConsulta={dataConsulta}
        />
      </Grid>
    );

  return (
    <Grid container>
      <Grid item md={12}>
        <Typography variant="h6">({dataSesion.estado}) </Typography>
      </Grid>
    </Grid>
  );
}
