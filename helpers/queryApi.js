import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react";

export function QueryApi({ dataConsulta }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (dataConsulta) enviarSolicitud(dataConsulta.url, dataConsulta.data);
  }, [dataConsulta]);
  const enviarSolicitud = (url, data) => {
    setLoading(true);
    axios
      .get(url, {
        params: data,
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
