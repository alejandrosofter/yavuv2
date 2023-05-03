import DialogContenido from "@components/forms/dialogContenido";
import Input from "@components/forms/input";
import { addQueryApi } from "@helpers/db";
import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";
import { useCollection } from "@nandorojo/swr-firestore";
import axios from "axios";
import { useState } from "react";

export function FeedbackEnvios({ open, setOpen, data }) {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const { data: destinatarios } = useCollection(
    `/difusion/${data?.id}/destinatarios`,
    { listen: true }
  );
  console.log(destinatarios);
  const enviar = () => {
    setLoading(true);
    addQueryApi("testDifusion", {
      id: data.id,
      email: email.target.value,
    }).then((res) => {
      setLoading(false);
      setOpen(false);
    });
  };

  return (
    <DialogContenido
      maxWidth="sm"
      fullWidth={true}
      titulo={"Feedback Envios"}
      open={open}
      setOpen={setOpen}
    >
      <Grid sx={{ p: 2 }} spacing={3} container>
        <Grid item md={10}></Grid>
      </Grid>
    </DialogContenido>
  );
}
