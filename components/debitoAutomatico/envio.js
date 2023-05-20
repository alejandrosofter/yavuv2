import DialogContenido from "@components/forms/dialogContenido";
import Input from "@components/forms/input";
import { QueryApi } from "@helpers/queryApi";
import { UseStorage } from "@hooks/useStorage";
import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";
import { useState } from "react";

export default function EnvioBanco({ open, setOpen, data }) {
  const [email, setEmail] = UseStorage("enviarBanco_email");

  const [dataConsulta, setDataConsulta] = useState();

  const enviar = () => {
    localStorage.setItem("enviarBanco_email", email);
    setDataConsulta({
      url: "/api/debitoAutomatico/enviar",
      data: { ...data, email },
    });
  };
  const successQuery = (dataConsulta, dataResponse) => {
    setOpen(false);
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
      </Grid>
      <QueryApi callbackSuccess={successQuery} dataConsulta={dataConsulta} />
    </DialogContenido>
  );
}
