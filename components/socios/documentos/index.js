import { useCallback } from "react";

import { getFechaString } from "@helpers/dates";
import { Grid } from "@mui/material";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_formDocumentos";
import {
  ModeloDocumentos,
  valoresInicialesDocumentacion,
} from "@modelos/ModeloSocios";
export const cols = [
  {
    field: "fechaVto",
    headerName: "Fecha Vto",
    width: 280,
    renderCell: (params) => getFechaString(params.value),
  },
  {
    field: "label_tipo",
    headerName: "Tipo Documento",
    width: 180,
  },
];
export default function DocumentacionSocio({ data, mod }) {
  const order = ["fechaVto", "desc"];
  const subColeccion = "documentos";
  const icono = "fas fa-image";
  const titulo = `DOCUMENTACION `;

  const clickImprimir = useCallback((data) => () => {}, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          order={order}
          // callbackclick={callbackclick}
          icono={icono}
          Modelo={ModeloDocumentos}
          valoresIniciales={valoresInicialesDocumentacion}
          dataForm={{ mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
