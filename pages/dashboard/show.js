import GraphEstadistica from "@pages/estadisticas/graph";
import { Grid } from "@mui/material";
import { useState } from "react";
import DashboardInit from "./dashboardInit";
import FiltroDashboard from "./filtroDashboard";

export default function ShowDashboard({ dashboard }) {
  const estadisticas = dashboard?.items;

  if (!dashboard) return <DashboardInit />;
  return (
    <Grid container>
      <Grid item md={8}>
        <h1>{dashboard.nombre}</h1>
      </Grid>

      <Grid spacing={1} alignItems="center" container>
        {estadisticas &&
          estadisticas.map((item) => (
            <Grid key={item.id} item md={item.size ? item.size : 4}>
              <GraphEstadistica
                acciones={[]}
                estadistica={{ ...item, id: item.idEstadistica }}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
