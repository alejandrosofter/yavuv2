import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import { FichaPaciente } from "./fichaPaciente";
import SelectPaciente from "./selectPaciente";
export default function Modulo({ mod }) {
  const [seleccion, setSeleccion] = useState();
  const cambiaPaciente = (select, item) => {
    if (item) setSeleccion(item);
  };
  return (
    <Grid container>
      <Grid item xs={8}>
        {seleccion && <FichaPaciente mod={mod} paciente={seleccion} />}
        {!seleccion && (
          <Typography variant="h6" gutterBottom component="div">
            Selecciona un paciente para poder mostrar su ficha
          </Typography>
        )}
      </Grid>
      <Grid item md={4}>
        <SelectPaciente callbackchange={cambiaPaciente} />
      </Grid>
    </Grid>
  );
}
