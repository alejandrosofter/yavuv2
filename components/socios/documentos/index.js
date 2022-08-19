import { useCallback, useState } from "react";

import { getFechaString } from "@helpers/dates";
import { Grid } from "@mui/material";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_formDocumentos";
import {
  ModeloDocumentos,
  valoresInicialesDocumentacion,
} from "@modelos/ModeloSocios";
import MuestraImagen from "@components/forms/muestraImagen";
import MuestraImagenDialog from "@components/forms/muestraImagenDialog";
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
  const [seleccion, setSeleccion] = useState(null);
  const [openMuestraImagen, setOpenMuestraImagen] = useState(false);
  const order = ["fechaVto", "desc"];
  const subColeccion = "documentos";
  const icono = "fas fa-image";
  const titulo = `DOCUMENTACION `;

  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-image",
      label: "Ver Documento",
      fn: (row) => {
        setSeleccion(row);
        setOpenMuestraImagen(true);
      },
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          acciones={acciones}
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          order={order}
          labelNuevo="Agregar documentacion"
          // callbackclick={callbackclick}
          icono={icono}
          Modelo={ModeloDocumentos}
          valoresIniciales={valoresInicialesDocumentacion}
          dataForm={{ mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
      <MuestraImagenDialog
        open={openMuestraImagen}
        setOpen={setOpenMuestraImagen}
        pathImagen={seleccion?.imagen}
      />
    </Grid>
  );
}
