import { useState } from "react";

import {
  ModeloCambioEstado,
  valoresInicialesCambioEstado,
} from "@modelos/ModeloSocios";
import { Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import ABMColeccion from "@components/forms/ABMcollection";
import moment from "moment";
import Form from "./_formCambiosEstado";
export default function CambiosEstadoSocio({ data, mod }) {
  const order = ["fechaInicio"];
  const subColeccion = "cambiosEstado";
  const icono = "fas fa-dumbbell";
  const titulo = `CAMBIOS DE ESTADO SOCIO `;
  const [seleccion, setSeleccion] = useState(null);
  const cols = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) => {
        const d = new Date(params.value.seconds * 1000);

        return (
          //en params.row tengo los otros datos
          <i>{`${moment(d).format("DD/MM/YY")}`}</i>
        );
      },
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
    {
      field: "label_motivo",
      headerName: "Motivo",
      width: 300,
    },
    {
      field: "detalle",
      headerName: "Acota",
      width: 180,
    },
  ];
  const cambiaEstado = async (valores, tipo) => {
    if (tipo === "nuevo") {
      await fuego.db
        .collection("socios")
        .doc(data.id)
        .update({ estado: valores.estado });
    }
    await fetch(`/api/socios/checkMensualizado/${data.id}`);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          order={order}
          // callbackclick={callbackclick}
          icono={icono}
          Modelo={ModeloCambioEstado}
          valoresIniciales={valoresInicialesCambioEstado}
          dataForm={{ seleccion, mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
