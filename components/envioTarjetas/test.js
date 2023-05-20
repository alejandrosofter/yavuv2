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
import { useState } from "react";

export default function Test({ open, setOpen, data }) {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const enviar = () => {
    setLoading(true);
    axios
      .get("/api/difusion/test", {
        params: { id: data.id, email: email.target.value },
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
      titulo={"TEST DIFUSION"}
      open={open}
      setOpen={setOpen}
    >
      <Grid sx={{ p: 2 }} spacing={3} container>
        <Grid item md={10}>
          <TextField
            fullWidth={true}
            label="Email"
            onChange={setEmail}
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
