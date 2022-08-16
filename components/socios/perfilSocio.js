import * as React from "react";
import {
  Icon,
  Grid,
  Badge,
  IconButton,
  Typoaphy,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";

import TabsSocio from "./tabsSocio";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDocument } from "@nandorojo/swr-firestore";
import MuestraImagen from "@components/forms/muestraImagen";
import FiltroSocios from "./filtroSocios";
import DataSocio from "./dataSocio";

export default function PerfilSocio({ mod, socio, callbackdelete }) {
  const { data } = useDocument(`socios/${socio?.objectID}`);
  if (!data) return "";
  if (!data.exists)
    return (
      <Grid container alignItems={"baseline"} sx={{ p: 3 }}>
        <Grid item md={1}></Grid>
        <Grid item container alignItems={"baseline"} direction="row" md={3}>
          <Icon sx={{ fontSize: 30 }} className="fas fa-exclamation-triangle" />
          <Typography sx={{ ml: 3 }} variant="h6">
            SIN SELECCION DE SOCIO
          </Typography>
        </Grid>
        <Grid item md={5}>
          <Typography sx={{ ml: -2 }} variant="body">
            Por favor seleccione un socio!
          </Typography>
        </Grid>
      </Grid>
    );
  return (
    <Grid container>
      <Grid item md={12}>
        <DataSocio callbackdelete={callbackdelete} mod={mod} dataSocio={data} />
      </Grid>

      <Grid item md={12}>
        <TabsSocio mod={mod} dataSocio={data} />
      </Grid>
    </Grid>
  );
}
