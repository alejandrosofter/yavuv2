import { useContext, useEffect, useState } from "react";
import { Context } from "context/userContext";

import { Grid, Typography, Icon, Button } from "@mui/material";
import Ayuda from "@pages/dashboard/ayuda";
import SelectDashboard from "@pages/dashboard/selectDashboard";
import ShowDashboard from "@pages/dashboard/show";
import { useAuthUser } from "next-firebase-auth";
import useLayout from "@hooks/useLayout";

export default function View({}) {
  const [dashboard, setDashboard] = useState(null);
  const auth = useAuthUser();
  useLayout({
    label: "Bienvenido!",
    titulo: "YAVU V2",
    acciones: [
      // { label: "Turnos", icono: "fas fa-calendar", url: "/turnos" },
      // { label: "Config", icono: "fas fa-cog", url: "/pacientes/config" },
    ],
  });
  const changeDashboard = (select, item) => {
    if (item) {
      localStorage.setItem("dashboard", JSON.stringify(item));
      setDashboard(item);
    } else {
      localStorage.removeItem("dashboard");
      setDashboard(null);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <Typography variant="caption" gutterBottom>
          <Icon sx={{ fontSize: 12 }} className="fas fa-hand-point-up" />
          Al boton (tipo hamburguesa) tienes los modulos que puedes operar!
        </Typography>
      </Grid>
      <Grid item md={4}>
        <SelectDashboard callbackchange={changeDashboard} />
      </Grid>
      <Grid item md={12}>
        <ShowDashboard dashboard={dashboard} />
      </Grid>
    </Grid>
  );
}
