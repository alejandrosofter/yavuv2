import { Grid, Button } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import Select from "../forms/select2Simple";
export default function Modulo({ callbackchange }) {
  const { data } = useCollection("consultorios", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  const [seleccion, setSeleccion] = useState(() => {
    const valor = localStorage.getItem("consultorio")
      ? JSON.parse(localStorage.getItem("consultorio"))
      : null;
    callbackchange(valor);
    return valor;
  });

  const handleChange = (item, e) => {
    localStorage.setItem("consultorio", JSON.stringify(item));
    setSeleccion(item);
    if (callbackchange) callbackchange(item, e);
  };
  if (!data) return "";
  return (
    <Grid spacing={1} container>
      {data.map((consultorio) => (
        <Grid key={consultorio.id} md={3} item>
          <Button
            sx={{ width: "20px" }}
            disabled={seleccion?.id === consultorio.id}
            onClick={handleChange.bind(this, consultorio)}
            key={consultorio.id}
          >
            {consultorio.nombreCorto}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
