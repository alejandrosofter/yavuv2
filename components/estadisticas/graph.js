import ChartDonut from "@components/forms/charts/donut";
import MenuAccion from "@components/forms/menuAcccion";
import { Grid, Typography, Paper, Stack } from "@mui/material";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import SelectorEstadisticaItem from "./selectorEstadistica";

export default function GraphEstadistica({ estadistica, acciones }) {
  const { statSeleccion, setStatSeleccion } = useState();
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const { data } = useDocument(`listeningData/${estadistica?.idListeningData}`);
  const { data: dataEstadistica } = useCollection(
    `listeningData/${estadistica?.idListeningData}/estadistica`,
    { listen: true }
  );
  const cambia = (values, data) => {
    if (data.datos) {
      setLabels(Object.keys(data.datos));
      setSeries(Object.values(data.datos));
    }
  };

  return (
    <Paper sx={{ p: 1 }} elevation={4}>
      <Stack alignItems="center" direction="row" spacing={1}>
        <MenuAccion acciones={acciones} />
        <Typography variant="caption">{estadistica.nombre}</Typography>
        <SelectorEstadisticaItem
          callbackchange={cambia}
          data={dataEstadistica}
        />
      </Stack>

      <ChartDonut labels={labels} series={series} />
    </Paper>
  );
}
