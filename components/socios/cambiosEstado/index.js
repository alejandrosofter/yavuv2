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
import { UseConfigModulo } from "@helpers/useConfigModulo";
import { getWherePermiso } from "@hooks/useUser";
export default function CambiosEstadoSocio({ data }) {
  const order = ["fechaInicio"];
  const subColeccion = "cambiosEstado";
  const icono = "fas fa-dumbbell";
  const titulo = `CAMBIOS DE ESTADO SOCIO `;
  const [seleccion, setSeleccion] = useState(null);
  const config = UseConfigModulo("socios");
  const idPlantilla = config?.plantillaCambioEstado;
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
      width: 150,
    },
    {
      field: "label_idMotivo",
      headerName: "Motivo",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 380,
      // renderCell: (params) => {
      //   return params.value ? params.value : "PENDIENTE";
      // },
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
          maxWidth={"md"}
          rowsPerPage={100}
          where={getWherePermiso(`socios/${data?.id}/${subColeccion}`)}
          hidePaginador={true}
          Modelo={ModeloCambioEstado}
          valoresIniciales={valoresInicialesCambioEstado}
          dataForm={{ socio: data, seleccion, idSocio: data?.id }}
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
