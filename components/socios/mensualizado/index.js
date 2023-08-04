import { useState } from "react";
import { ModeloMensualizado, valoresMensualizado } from "@modelos/ModeloSocios";
import { Grid, Icon, Tooltip } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import ABMColeccion from "@components/forms/ABMcollection";
import moment from "moment";
import Form from "./_form";
import { getFechaString } from "@helpers/dates";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import ImpresionDialog from "@components/forms/impresion";
import { localstorageParser } from "@helpers/arrays";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import { getWherePermiso } from "@hooks/useUser";
import { formatMoney } from "@helpers/numbers";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";

export default function CambiosEstadoSocio({ data }) {
  const order = ["fechaInicio"];
  const subColeccion = "mensualizado";
  const icono = "fas fa-dumbbell";
  const titulo = `MENSUALIZACIONES`;
  const [seleccion, setSeleccion] = useState(null);
  const config = UseConfigModulo("socios");
  const idPlantilla = config?.plantillaMensualizacion;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });

  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",
      fn: async (row) => {
        const socio = JSON.parse(localStorage.getItem("socioSeleccion"));
        const cuentaCbu = row.idCuentaCbu
          ? await fuego.db.collection(`cuentasCbu`).doc(row.idCuentaCbu).get()
          : null;
        const refSocio = await fuego.db.doc(`socios/${socio.objectID}`).get();
        setDataImpresion({
          ...row,
          socio,
          cuentaCbu: cuentaCbu ? cuentaCbu.data() : {},
          dataSocio: refSocio.data(),
        });
        setOpenImpresion(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-envelope",
      label: "Re-Enviar a su Actividad",
      fn: (row) => {
        setDataConsulta({
          url: "/api/mensualizados/reEnviarActividad",
          data: row,
        });
      },
    },
  ];
  const cols = [
    {
      field: "agregarActividad",
      headerName: "",
      width: 12,
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={`Enviado a modulo actividades`}>
            <Icon class="fas fa-futbol" />
          </Tooltip>
        ) : (
          ""
        ),
    },
    {
      field: "esPorDebitoAutomatico",
      headerName: "",
      width: 15,
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={`Es por Débito automático`}>
            <Icon class="fas fa-credit-card" />
          </Tooltip>
        ) : (
          ""
        ),
    },

    {
      field: "estado",
      headerName: "",
      width: 0,
      renderCell: (params) => {
        switch (params.value) {
          case "BAJA (ultimo mes)":
            return (
              <Icon
                title={`Mensualizacion de BAJA con ultimo mes`}
                className="fas fa-dot-circle"
                sx={{ color: "yellow" }}
              />
            );
          case "BAJA DEFINITIVA":
            return (
              <Icon
                title={`Mensualizacion de BAJA`}
                className="fas fa-dot-circle"
                sx={{ color: "yellow" }}
              />
            );

          case "ALTA":
            return (
              <Icon
                title={`Mensualizacion ACTIVA`}
                className="fas fa-dot-circle"
                sx={{ color: "green" }}
              />
            );
          case "SUSPENDIDA":
            return (
              <Icon
                title={`Mensualizacion SUSPENDIDA`}
                className="fas fa-dot-circle"
                sx={{ color: "orange" }}
              />
            );
        }
      },
    },
    {
      field: "fechaInicio",
      headerName: "Prox.Cuota",
      width: 125,
      type: "date",
      renderCell: (params) => getFechaString(params.value),
    },

    {
      field: "label_idProducto",
      headerName: "Producto",
      width: 190,
      renderCell: (params) =>
        renderCellExpandData(params, (row) => `${row.label_idProducto}`),
    },
    {
      field: "idProducto_importe",
      headerName: "$ Importe",
      width: 110,
      renderCell: (params) => formatMoney(params.value),
    },

    // {
    //   field: "label_tipoPeriodo",
    //   headerName: "Tipo Periodo",
    //   width: 160,
    //   renderCell: (params) =>
    //     renderCellExpandData(params, (row) => `${row.label_tipoPeriodo}`),
    // },
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
          Modelo={ModeloMensualizado}
          valoresIniciales={valoresMensualizado}
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
        emailDefault={dataImpresion?.dataSocio?.email}
        data={dataImpresion}
        plantilla={plantilla}
        nombrePlantillaEmail="emailAfiliacion"
        attachments={[{ filename: "AFILIACION.pdf", data: plantilla }]}
      />
    </Grid>
  );
}
