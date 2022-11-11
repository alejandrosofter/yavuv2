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
import { getFechaString } from "@helpers/dates";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import ImpresionDialog from "@components/forms/impresion";
import { localstorageParser } from "@helpers/arrays";
export default function CambiosEstadoSocio({ data, mod }) {
  const order = ["fechaInicio"];
  const subColeccion = "cambiosEstado";
  const icono = "fas fa-dumbbell";
  const titulo = `CAMBIOS DE ESTADO SOCIO `;
  const [seleccion, setSeleccion] = useState(null);
  const idPlantilla = mod.config?.plantillaCambioEstado;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });

  const cols = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
    {
      field: "label_motivo",
      headerName: "Motivo",
      width: 250,
    },
    {
      field: "estadoCambioEstado",
      headerName: "Status",
      width: 380,
      renderCell: (params) => {
        return params.value ? params.value : "PENDIENTE";
      },
    },
  ];
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",
      fn: (row) => {
        const socio = localstorageParser("socioSeleccion");

        setDataImpresion({ ...row, socio });
        setOpenImpresion(true);
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
          icono={icono}
          rowsPerPage={100}
          hidePaginador={true}
          Modelo={ModeloCambioEstado}
          valoresIniciales={valoresInicialesCambioEstado}
          dataForm={{ seleccion, mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
      <ImpresionDialog
        titulo="IMPRESIÓN CAMBIO DE ESTADO"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="ESTADO SOCIO "
        data={dataImpresion}
        plantilla={plantilla}
        nombrePlantillaEmail="emailAfiliacion"
        attachments={[{ filename: "AFILIACION.pdf", data: plantilla }]}
      />
    </Grid>
  );
}
