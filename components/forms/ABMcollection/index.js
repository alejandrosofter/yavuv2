import ColeccionTable from "@components/forms/coleccionTable";

import { useState } from "react";
import {
  Backdrop,
  Button,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { ABMCollection_nuevo } from "./nuevo";
import { ABMCollection_editar } from "./editar";
import Dialogo from "../dialogo";
import { QueryApi } from "@helpers/queryApi";

export default function ABMColeccion({
  valoresIniciales,
  hidePaginador,

  rowsPerPage,
  showExport = false,
  Modelo,
  coleccion,
  icono,
  limit,
  label,
  maxWidth,
  subTitulo,
  dataForm,
  orderBy,
  hideNew,
  where,
  columns,
  acciones,
  labelNuevo,
  titulo,
  preData,
  Form,
  getRowClassName,
  onSelectionModelChange,
  callbackchange,
}) {
  const accionesABM = [
    {
      esFuncion: true,
      icono: "fas fa-pencil",
      label: "Editar",
      fn: (row) => {
        setSeleccion(row);
        setOpenEditar(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-trash",
      label: "Quitar",
      color: "red",
      fn: (row) => {
        setSeleccion(row);
        setOpenConfirma(true);
      },
    },
    {
      label: "",
    },
  ];
  const [seleccion, setSeleccion] = useState(null);
  const [openEditar, setOpenEditar] = useState(null);

  const [openNuevo, setOpenNuevo] = useState(null);
  const [dataConsulta, setDataConsulta] = useState();
  const [openConfirma, setOpenConfirma] = useState(null);
  const [accions, setAcctions] = useState(
    accionesABM.concat(acciones ? acciones : [])
  );
  const confirma = () => {
    quitarDocumento(seleccion).then(() => {
      setOpenConfirma(false);
    });
  };
  const callbackclick = (params) => {
    cambiaSeleccion(params.row);
  };
  const quitarDocumento = (doc) => {
    return fuego.db.collection(coleccion).doc(doc.id).delete();
  };
  const callbackQuery = (data, response) => {
    window.open(response.data?.url, "_blank");
  };
  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };
  const clickExcel = () => {
    setDataConsulta({
      url: "/api/bigquery/exportarColeccion",
      data: {
        token: fuego.auth().currentUser.uid,
        coleccion,
        tk: new Date().getTime(),
      },
    });
  };
  return (
    <Grid container>
      <Grid item md={9}>
        <Typography variant="h3" gutterBottom>
          <Icon className={icono} /> {titulo}
        </Typography>
      </Grid>

      <Grid item md={3}>
        {!hideNew && (
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => setOpenNuevo(true)}
          >
            <Icon fontSize="small" className="fas fa-plus" />
            {labelNuevo ? labelNuevo : "Nuevo"}
          </Button>
        )}
      </Grid>
      {showExport && (
        <Grid item md={1}>
          <IconButton
            variant="outlined"
            size="small"
            color="primary"
            onClick={clickExcel}
          >
            <Icon fontSize="small" className="fas fa-file-excel" />
          </IconButton>
        </Grid>
      )}
      <Grid item md={12}>
        <ColeccionTable
          hidePaginador={hidePaginador}
          rowsPerPage={rowsPerPage}
          acciones={accions}
          where={where}
          limit={limit}
          callbackclick={callbackclick}
          columns={columns}
          orderBy={orderBy}
          onSelectionModelChange={onSelectionModelChange}
          getRowClassName={getRowClassName}
          coleccion={coleccion}
        />
      </Grid>

      <ABMCollection_nuevo
        open={openNuevo}
        setOpen={setOpenNuevo}
        dataForm={dataForm}
        coleccion={coleccion}
        valoresIniciales={valoresIniciales}
        Modelo={Modelo}
        icono={icono}
        label={label}
        preData={preData}
        maxWidth={maxWidth}
        subTitulo={subTitulo}
        Form={Form}
      />
      {seleccion && (
        <ABMCollection_editar
          open={openEditar}
          doc={seleccion}
          setOpen={setOpenEditar}
          dataForm={dataForm}
          coleccion={coleccion}
          valoresIniciales={valoresIniciales}
          Modelo={Modelo}
          preData={preData}
          icono={icono}
          label={label}
          maxWidth={maxWidth}
          subTitulo={subTitulo}
          Form={Form}
        />
      )}
      <Dialogo
        callbackAcepta={confirma}
        titulo={`Estas seguro de eliminar este registro?`}
        open={openConfirma}
        setOpen={setOpenConfirma}
      />

      <QueryApi callbackSuccess={callbackQuery} dataConsulta={dataConsulta} />
    </Grid>
  );
}
