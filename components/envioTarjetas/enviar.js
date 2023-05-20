import DialogContenido from "@components/forms/dialogContenido";
import Input from "@components/forms/input";
import { addQueryApi } from "@helpers/db";
import { UseStorage } from "@hooks/useStorage";
import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EnviarCredenciales({ open, setOpen, data }) {
  const [email, setEmail] = UseStorage("enviarTarjetas_email");
  const [loading, setLoading] = useState(false);

  const enviar = () => {
    setLoading(true);
    localStorage.setItem("enviarTarjetas_email", email);
    addQueryApi("enviarTarjetas", { id: data?.id, email })
      .then((res) => {
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <DialogContenido
      maxWidth="sm"
      fullWidth={true}
      titulo={"ENVIAR CREDENCIALES PARA IMPRESION"}
      open={open}
      setOpen={setOpen}
    >
      <Grid sx={{ p: 2 }} spacing={3} container>
        <Grid item md={10}>
          <TextField
            fullWidth={true}
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            campo="email"
          />
        </Grid>
        <Grid item md={2}>
          <Button variant="outlined" onClick={enviar}>
            Enviar
          </Button>
        </Grid>
        <Grid item md={12}>
          <Typography variant="body2">
            Se enviará un email con las credenciales para poder imprimir las
            tarjetas. Aguarde y en notificaciones verá el estado del envío.
          </Typography>
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </DialogContenido>
  );
}
