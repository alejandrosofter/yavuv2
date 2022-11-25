import DialogContenido from "@components/forms/dialogContenido";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react";

export function QueryApi({
  backdropActive = true,
  dataConsulta,
  method = "get",
  callbackSuccess,
  callbackLoading,
}) {
  const [loading, setLoading] = useState(false);
  const [openMensaje, setOpenMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    console.log(dataConsulta);
    if (dataConsulta) enviarSolicitud(dataConsulta.url, dataConsulta.data);
  }, [dataConsulta]);
  const enviarSolicitud = (url, data) => {
    if (backdropActive) setLoading(true);
    if (callbackLoading) callbackLoading(true);
    if (method === "get")
      axios
        .get(url, {
          params: data,
        })
        .then((data) => {
          if (callbackLoading) callbackLoading(false);
          setLoading(false);
          if (callbackSuccess) callbackSuccess(dataConsulta, data);
        })
        .catch((err) => {
          if (callbackLoading) callbackLoading(false);
          setLoading(false);
          setOpenMensaje(true);
          setMensaje(JSON.stringify(err?.response));
        });
    else
      axios
        .post(url, {
          params: data,
        })
        .then(() => {
          if (callbackLoading) callbackLoading(false);
          setLoading(false);
        })
        .catch((err) => {
          if (callbackLoading) callbackLoading(false);
          setLoading(false);
          setOpenMensaje(true);
          setMensaje(JSON.stringify(err.response));
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
