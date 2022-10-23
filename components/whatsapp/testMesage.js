import { Grid, Button, TextField } from "@mui/material";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { useState } from "react";

export default function TestMessage() {
  const [mensaje, setMensaje] = useState("");
  const [nro, setNro] = useState("");
  const { add } = useCollection(
    `whatsapp/${fuego.auth().currentUser?.uid}/mensajes`
  );
  const enviarMensaje = async () => {
    console.log({ mensaje, nro, fecha: new Date() });
    await add({ estado: "PENDIENTE", mensaje, nro, fecha: new Date() });
  };
  return (
    <Grid container>
      <Grid item md={12}>
        <TextField
          onKeyUp={(e) => setMensaje(e.target.value)}
          label="Mensaje"
        />
        <TextField onKeyUp={(e) => setNro(e.target.value)} label="Nro" />
        <Button onClick={enviarMensaje} variant="outlined">
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}
