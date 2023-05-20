import ABMColeccion from "@components/forms/ABMcollection";

import { Button, Grid, Icon, Typography } from "@mui/material";
import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloActividades";
import Form from "@components/actividades/_form";
import { getWherePermiso } from "@hooks/useUser";
export default function ListaActividades({ callbackchange, mod }) {
  const [seleccion, setSeleccion] = useState(null);

  const order = ["nombreActividad", "asc"];

  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };
  const columns = [
    {
      field: "nombreActividad",
      headerName: "Actividad",
      width: 200,
    },
  ];
  const acciones = [];

  return (
    <Grid container>
      <Grid item md={12}>
        <ABMColeccion
          acciones={acciones}
          coleccion={`actividades`}
          columns={columns}
          hidePaginador={true}
          rowsPerPage={100}
          where={getWherePermiso("actividades")}
          labelNuevo="nueva"
          preData={{}}
          order={order}
          maxWidth={"md"}
          callbackchange={cambiaSeleccion}
          // callbackclick={callbackclick}
          icono={"fas fa-"}
          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          dataForm={{ mod }}
          titulo={`ACTIVIDADES`}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
