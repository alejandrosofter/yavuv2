import { Grid, Typography, Icon } from "@mui/material";
import { useState } from "react";
import SelectDashboard from "@components/dashboard/selectDashboard";
import ShowDashboard from "@components/dashboard/show";

export default function Modulo({ mod }) {
  const [dashboard, setDashboard] = useState(null);
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
