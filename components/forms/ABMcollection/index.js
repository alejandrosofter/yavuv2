import ColeccionTable from "@components/forms/coleccionTable";

import { useState } from "react";
import { Button, Grid, Icon, Typography } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { ABMCollection_nuevo } from "./nuevo";
import { ABMCollection_editar } from "./editar";

export default function ABMColeccion({
  valoresIniciales,
  Modelo,
  coleccion,
  icono,
  label,
  maxWidth,
  subTitulo,
  dataForm,
  orderBy,
  where,
  columns,
  acciones,
  titulo,
  preData,
  Form,
  getRowClassName,
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
        quitarDocumento(row).then(() => {
          console.log("Documento eliminado");
        });
      },
    },
    {
      label: "",
    },
  ];
  const [seleccion, setSeleccion] = useState(null);
  const [openEditar, setOpenEditar] = useState(null);
  const [openNuevo, setOpenNuevo] = useState(null);
  const [accions, setAcctions] = useState(
    accionesABM.concat(acciones ? acciones : [])
  );

  const callbackclick = (params) => {
    cambiaSeleccion(params.row);
  };
  const quitarDocumento = (doc) => {
    return fuego.db.collection(coleccion).doc(doc.id).delete();
  };

  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };

  return (
    <Grid container>
      <Grid item md={9}>
        <Typography variant="h6" gutterBottom>
          {titulo}
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenNuevo(true)}
        >
          <Icon fontSize="small" className="fas fa-plus" />
        </Button>
      </Grid>
      <Grid item md={12}>
        <ColeccionTable
          acciones={accions}
          where={where}
          callbackclick={callbackclick}
          columns={columns}
          orderBy={orderBy}
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
    </Grid>
  );
}
