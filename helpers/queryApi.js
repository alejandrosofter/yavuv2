import DialogContenido from "@components/forms/dialogContenido";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react";

export function QueryApi({ dataConsulta, method = "get", callbackSuccess }) {
  const [loading, setLoading] = useState(false);
  const [openMensaje, setOpenMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    if (dataConsulta) enviarSolicitud(dataConsulta.url, dataConsulta.data);
  }, [dataConsulta]);
  const enviarSolicitud = (url, data) => {
    setLoading(true);
    if (method === "get")
      axios
        .get(url, {
          params: data,
        })
        .then((data) => {
          setLoading(false);
          if (callbackSuccess) callbackSuccess(dataConsulta, data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setOpenMensaje(true);
          setMensaje(err.response?.data?.msg);
        });
    else
      axios
        .post(url, {
          params: data,
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setOpenMensaje(true);
          setMensaje(err.response.data.msg);
        });
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogContenido
        open={openMensaje}
        setOpen={setOpenMensaje}
        titulo="OPS..."
      >
        {mensaje}
      </DialogContenido>
    </>
  );
}
