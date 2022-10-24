import { QueryApi } from "@helpers/queryApi";
import { Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fuego, useDocument } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
export default function StatusWhatsapp({ onchangeSession }) {
  const [dataConsulta, setDataConsulta] = useState();
  const [loading, setLoading] = useState();
  const { data: dataSesion } = useDocument(
    `whatsapp/${fuego.auth().currentUser?.uid}`,
    { listen: true }
  );
  useEffect(() => {
    if (onchangeSession) onchangeSession(dataSesion);
  }, [dataSesion]);
  const checkEstado = () => {
    const data = { idUsuario: fuego.auth().currentUser?.uid };
    setDataConsulta({ url: "/api/whatsapp/checkEstado", data });
  };
  if (!dataSesion) return "cargando...";
  return (
    <Grid container>
      <Grid item md={6}>
        <Typography>
          {" "}
          DATOS DE LA SESION {getFechaString(dataSesion.fecha)} ESTADO:{" "}
          {dataSesion.estado}
        </Typography>
      </Grid>
      <QueryApi
        callbackLoading={(loading) => setLoading(loading)}
        backdropActive={false}
        dataConsulta={dataConsulta}
      />
    </Grid>
  );
}
