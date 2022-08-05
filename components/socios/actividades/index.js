import { useState } from "react";
import { Grid } from "@mui/material";
import { getFechaString } from "@helpers/dates";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_formActividades";
import {
  ModeloActividades,
  valoresInicialesActividades,
} from "@modelos/ModeloSocios";
export const cols = [
  {
    field: "fechaInicio",
    headerName: "Fecha",
    width: 90,
    renderCell: (params) => getFechaString(params.value),
  },

  {
    field: "label_idActividad",
    headerName: "Actividad",
    width: 370,
  },

  {
    field: "estado",
    headerName: "Estado",
    width: 90,
  },
];
export default function SocioActividades({ mod, data }) {
  const order = ["fechaInicio"];
  const subColeccion = "actividades";
  const icono = "fas fa-dumbbell";
  const titulo = `ACTIVIDADES `;
  const [seleccion, setSeleccion] = useState(null);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          order={order}
          // callbackclick={callbackclick}
          icono={icono}
          Modelo={ModeloActividades}
          valoresIniciales={valoresInicialesActividades}
          dataForm={{ seleccion, mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
