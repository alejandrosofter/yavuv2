import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import { FichaPaciente } from "./fichaPaciente";
import SelectPaciente from "./selectPaciente";
export default function Modulo({ mod }) {
  const [seleccion, setSeleccion] = useState();
  const cambiaPaciente = (select, item) => {
    setSeleccion(item);
  };
  return (
    <Grid container>
      <Grid item md={8}></Grid>
      <Grid item md={4}>
        <SelectPaciente esForm={false} callbackchange={cambiaPaciente} />
      </Grid>
      <Grid item xs={12}>
        {seleccion && <FichaPaciente mod={mod} paciente={seleccion} />}
        {!seleccion && (
          <Typography variant="h6" gutterBottom component="div">
            Selecciona un paciente para poder mostrar su ficha
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
