import ABMColeccion2 from "@components/forms/ABMcollection2";
import DialogContenido from "@components/forms/dialogContenido";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";

import { ModeloMensualizado, valoresMensualizado } from "@modelos/ModeloSocios";
import { Grid, Typography, Button, Icon, Badge } from "@mui/material";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useRef, useState } from "react";
import { getFechaString } from "@helpers/dates";
import { Box } from "@mui/system";
import MovimientosPredeuda from "@components/generacionDeudas/movimientos";
import NuevoMovimientoGeneracionDeuda from "@components/generacionDeudas/movimientos/nuevo";
import { formatMoney } from "@helpers/numbers";
import { quitarValoresNull } from "@helpers/objects";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import Form from "./_form";
import { getWherePermiso } from "@hooks/useUser";
import BajaGeneracionDeuda from "./baja";
import SuspenderGeneracionDeuda from "./suspender";
export default function GenerarDeudaInscriptos({
  open,
  setOpen,
  actividad,
  grupo,
}) {
  const config = UseConfigModulo("actividades");
  const idPlantilla = config?.plantillaAsistencias;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [openMovimientos, setOpenMovimientos] = useState();
  const tableInstanceRef = useRef();

  const refData = useRef([]);
  const [openSuspender, setOpenSuspender] = useState(false);
  const [openBaja, setOpenBaja] = useState(false);
  const [openNuevoMovimiento, setOpenNuevoMovimiento] = useState(false);

  const [dataSeleccion, setDataSeleccion] = useState();

  //call to api to get data axios or fetch

  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const order = ["apellido", "asc"];

  const generaDeuda = (cell) => {
    const condFechas = new Date(cell.fechaInicio.seconds * 1000) < new Date();
    const cobrarMesActual =
      cell.estado === "ALTA" ? true : cell.cobrarMesActual;

    return condFechas && cobrarMesActual;
  };
  const getImporteBonificar = (snap) => {
    const bonificaImporte = snap.bonificacionImporte
      ? Number(snap.bonificacionImporte)
      : 0;
    const bonificaPorcentaje = snap.bonificacionPorcentaje
      ? Number(snap.bonificacionPorcentaje)
      : 0;
    return (
      (Number(snap.idProducto_importe) * bonificaPorcentaje) / 100 +
      bonificaImporte
    );
  };
  const columns = [
    {
      accessorKey: "apellido",
      header: "Socio",
      filterFn: "includesString",
      Cell: ({ cell }) =>
        `${cell.row.original.apellido}, ${cell.row.original.nombre}`,
      size: 220,
    },
    {
      accessorKey: "fechaInicio",
      header: "Prox. Cuota",
      filterFn: "includesString",
      Cell: ({ cell }) => `${getFechaString(cell.row.original.fechaInicio)}`,
      size: 150,
    },
    {
      accessorKey: "cantidadAsistencias",
      header: "Asiste",
      filterFn: "includesString",
      Cell: ({ cell }) => `${cell.getValue() ? cell.getValue() : 0}`,
      size: 110,
    },
    {
      accessorKey: "idProducto_importe",
      header: "Importe",
      filterFn: "includesString",
      Cell: ({ cell }) => {
        const bonifica = getImporteBonificar(cell.row.original);
        if (bonifica > 0)
          return `${formatMoney(
            cell.getValue() - bonifica
          )} (bonif. ${formatMoney(bonifica)})`;
        return `${formatMoney(cell.getValue())}`;
      },
      size: 110,
    },
    {
      accessorKey: "estado",
      header: "Genera",
      filterFn: "includesString",
      Cell: ({ cell }) => `${generaDeuda(cell.row.original) ? "SI" : "NO"}`,
      size: 100,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      filterFn: "includesString",
      Cell: ({ cell }) => (
        <>
          {cell.getValue()}
          <Typography variant="caption" sx={{ ml: 1 }}>
            {cell.row.original.fechaCambioEstado
              ? getFechaString(cell.row.original.fechaCambioEstado)
              : ""}
          </Typography>
        </>
      ),
      size: 150,
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-refresh",
    //   label: "Baja de Mensualizacion",
    //   fn: (data) => {
    //     setDataConsulta({
    //       url: "/api/menusalizaciones/bajaMenusal",
    //       data,
    //     });
    //   },
    // },
  ];
  const selectParaGenerar = () => {
    tableInstanceRef.current?.resetRowSelection();

    tableInstanceRef.current?.setRowSelection(
      refData?.current?.reduce((acc, item) => {
        if (generaDeuda(item)) {
          acc[item.id] = true;
        }
        return acc;
      }, {})
    );
  };
  const getItemRow = (idRow) => {
    const item = refData?.current?.find((item) => item.id === idRow);

    return quitarValoresNull({
      id: item.id,
      apellido: item.apellido,
      nombre: item.nombre,
      estado: item.estado,
      fechaCambioEstado: item.fechaCambioEstado,
      idSocio: item.idSocio,
    });
  };
  const getItemsSeleccion = () => {
    const items = tableInstanceRef.current.getState().rowSelection;
    return Object.keys(items).reduce((acc, item) => {
      if (items[item]) {
        acc.push(getItemRow(item));
      }
      return acc;
    }, []);
  };
  const selectNuevo = () => {
    setDataSeleccion(getItemsSeleccion());
    setOpenNuevoMovimiento(true);
  };
  const creoMovimiento = () => {
    setOpenNuevoMovimiento(false);
    setOpenMovimientos(true);
    tableInstanceRef.current?.resetRowSelection();
  };
  const where = getWherePermiso("actividades").concat([
    ["estado", "!=", "BAJA DEFINITIVA"],
  ]);
  const suspender = () => {
    setDataSeleccion(getItemsSeleccion());
    setOpenSuspender(true);
  };
  const baja = () => {
    setDataSeleccion(getItemsSeleccion());
    setOpenBaja(true);
  };
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="lg"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={9}>
          <Box spacing={1} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ color: "#ccc", pr: 1 }} gutterBottom>
              {`${actividad?.nombreActividad} /`}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {` ${grupo?.nombreGrupo} `}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={12}>
          <ABMColeccion2
            hideNew={true}
            coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/integrantes`}
            columns={columns}
            refData={refData}
            acciones={acciones}
            maxWidth={"md"}
            where={where}
            gridOptions={{
              renderTopToolbarCustomActions: () => (
                <Grid spacing={3} sx={{ p: 2 }} container>
                  <Button title="Seleccionar" onClick={selectParaGenerar}>
                    <Icon sx={{ mr: 1 }} className="fas fa-clipboard-check" />{" "}
                  </Button>
                  <Button
                    title="Registro de Movimientos"
                    onClick={() => setOpenMovimientos(true)}
                  >
                    <Icon sx={{ mr: 1 }} className="fas fa-archive" />{" "}
                  </Button>
                  <Button
                    sx={{ backgroundColor: "green", mr: 2 }}
                    variant="contained"
                    onClick={selectNuevo}
                  >
                    <Icon sx={{ mr: 1 }} className="fas fa-money-check" />{" "}
                    GENERAR DEUDA
                  </Button>
                  <Button
                    sx={{ backgroundColor: "orange", mr: 2 }}
                    variant="contained"
                    onClick={suspender}
                  >
                    <Icon sx={{ mr: 1 }} className="fas fa-money-check" />{" "}
                    SUSPENDER
                  </Button>
                  <Button
                    sx={{ backgroundColor: "red", mr: 2 }}
                    variant="contained"
                    onClick={() => baja}
                  >
                    <Icon sx={{ mr: 1 }} className="fas fa-money-check" /> BAJA
                  </Button>
                </Grid>
              ),
              tableInstanceRef,
              enableRowSelection: true,
              muiTableBodyRowProps: ({ row }) => ({
                sx: {
                  backgroundColor:
                    row.getValue("estado") === "BAJA (ultimo mes)"
                      ? "yellow"
                      : row.getValue("estado") === "BAJA DEFINITIVA"
                      ? "grey"
                      : "",
                  fontStyle:
                    row.getValue("estado") === "BAJA" ? "italic" : "normal",
                },
              }),
              //   muiSelectCheckboxProps: ({ row }) => {
              //     ;
              //     return {
              //       color: "secondary",
              //       disabled: true,
              //     };
              //   },
              initialState: { showColumnFilters: false },
              getRowId: (originalRow) => originalRow.id,
              filterFns: {
                filtroFecha: (row, id, filterValue) => {
                  const date = new Date(row.original[id].seconds * 1000);
                  const dateFiltro = new Date(filterValue);

                  //si es fecha invalida
                  if (isNaN(dateFiltro.getTime())) return true;
                  //comparo fechas
                  return (
                    date.getDate() === dateFiltro.getDate() &&
                    date.getMonth() === dateFiltro.getMonth() &&
                    date.getFullYear() === dateFiltro.getFullYear()
                  );
                },
              },
              // getRowId: (row) => row.id,
            }}
            order={order}
            Modelo={ModeloMensualizado}
            valoresIniciales={valoresMensualizado}
            preData={{
              idActividad: actividad?.id,
              idGrupoActividad: grupo?.id,
              label_idActividad: actividad?.nombreActividad,
              label_idGrupoActividad: grupo?.nombreGrupo,
              agregarActividad: true,
            }}
            dataForm={{
              showSelectSocio: true,
            }}
            labelNuevo="Agregar Integrante"
            titulo={`INTEGRANTES`}
            subTitulo={"del grupo"}
            Form={Form}
          />
        </Grid>
        <MovimientosPredeuda
          openDrawer={openMovimientos}
          setOpenDrawer={setOpenMovimientos}
          grupo={grupo}
          actividad={actividad}
        />
        <BajaGeneracionDeuda
          data={dataSeleccion}
          open={openBaja}
          setOpen={setOpenBaja}
        />
        <SuspenderGeneracionDeuda
          open={openSuspender}
          data={dataSeleccion}
          setOpen={setOpenSuspender}
        />
        <NuevoMovimientoGeneracionDeuda
          open={openNuevoMovimiento}
          setOpen={setOpenNuevoMovimiento}
          seleccion={dataSeleccion}
          grupo={grupo}
          callbackSuccess={creoMovimiento}
          actividad={actividad}
          data={dataSeleccion}
        />
        <ImpresionDialog
          titulo="IMPRESIÓN ASISTENCIAS"
          setOpen={setOpenImpresion}
          open={openImpresion}
          asunto="ASISTENCIAS "
          data={dataImpresion}
          plantilla={plantilla}
        />
      </Grid>
    </DialogContenido>
  );
}
