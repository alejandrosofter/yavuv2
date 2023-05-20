import FiltroDashboard from "@pages/dashboard/filtroDashboard";
import ChartDonut from "@components/forms/charts/donut";
import MenuAccion from "@components/forms/menuAcccion";
import { QueryApi } from "@helpers/queryApi";
import { Grid, Typography, Paper, Stack } from "@mui/material";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import SelectorEstadisticaItem from "./selectorEstadistica";

export default function GraphEstadistica({ estadistica, acciones }) {
  const { statSeleccion, setStatSeleccion } = useState();
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [dataConsulta, setDataConsulta] = useState();
  const [filtro, setFiltro] = useState();
  const [dataEstadistica, setDataEstadistica] = useState();

  useEffect(() => {
    setDataEstadistica(estadistica);
    setDataConsulta({
      url: "/api/bigquery/querysql",
      data: { ...estadistica, filtro },
    });
  }, [estadistica]);
  useEffect(() => {
    setDataConsulta({
      url: "/api/bigquery/querysql",
      data: { ...estadistica, filtro },
    });
  }, [filtro]);

  const callbackFiltro = (values, data) => {
    setFiltro(data);
  };
  const successInfo = (data, info) => {
    if (info.data.length > 0) {
      setLabels(
        info.data.map((item) => (item["label"] ? item["label"] : "Sin asignar"))
      );
      setSeries(info.data.map((item) => item["value"]));
    }
  };

  return (
    <Paper sx={{ p: 1 }} elevation={4}>
      <Stack alignItems="center" direction="row" spacing={1}>
        <MenuAccion acciones={acciones} />
        <Typography variant="caption">{estadistica.nombre}</Typography>

        <Grid item md={4}>
          <FiltroDashboard
            tipoFiltro={estadistica.filtro}
            callbackchange={callbackFiltro}
          />
        </Grid>
      </Stack>

      <ChartDonut estadistica={estadistica} labels={labels} series={series} />
      <QueryApi dataConsulta={dataConsulta} callbackSuccess={successInfo} />
    </Paper>
  );
}
