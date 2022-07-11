import DialogContenido from "@components/forms/dialogContenido";
import Input from "@components/forms/input";
import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EnviarCredenciales({ open, setOpen, data }) {
  const [email, setEmail] = useState(
    localStorage.getItem("enviarTarjetas_email")
  );
  const [loading, setLoading] = useState(false);

  const enviar = () => {
    setLoading(true);
    localStorage.setItem("enviarTarjetas_email", email);
    axios
      .get("/api/envioTarjetas/notificar", {
        params: { id: data?.id, email },
      })
      .then(() => {
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
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
