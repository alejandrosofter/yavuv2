import ABMColeccion2 from "@components/forms/ABMcollection2";
import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import ImpresionDialog from "@components/forms/impresion";
import NuevoGenerico from "@components/NuevoGenerico2";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import PerfilSocio from "@components/socios/perfilSocio";
import { getModUsuario } from "@helpers/db";
import Form from "@components/sociosPredeuda/_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import {
  Grid,
  Typography,
  Button,
  Icon,
  Menu,
  List,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
} from "@mui/material";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useRef, useState } from "react";
import { getFechaString } from "@helpers/dates";
import { Box } from "@mui/system";
import axios from "axios";
import { QueryApi } from "@helpers/queryApi";
export default function InscriptosGrupo({
  open,
  setOpen,
  actividad,
  grupo,
  mod,
  parentData,
}) {
  const idPlantilla = mod.config?.plantillaAsistencias;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
  const [dataExternal, setDataExternal] = useState();
  const tableInstanceRef = useRef();
  const [seleccion, setSeleccion] = useState();
  const [openNuevoMovimiento, setOpenNuevoMovimiento] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [inscriptos, setInscriptos] = useState([]);

  //call to api to get data axios or fetch
  useEffect(() => {
    setDataConsulta({
      url: `/api/actividades/getIntegrantes`,
      data: { actividad, grupo },
    });
  }, [actividad, grupo]);

  const modSocio = getModUsuario("socios");

  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const order = ["apellido", "asc"];

  const callbackclick = (data) => {
    console.log(data);
  };
  const changeData = (data) => {
    setInscriptos(data);
  };
  const columns = [
    {
      accessorKey: "apellido",
      header: "Socio",
      filterFn: "includesString",
      Cell: ({ cell }) =>
        `${cell.row.original.apellido}, ${cell.row.original.nombre}`,
      size: 250,
    },
    {
      accessorKey: "ultimaCuota",
      header: "Ultima Cuota",
      filterFn: "includesString",
      Cell: ({ cell }) => `${getFechaString(cell.row.original.ultimaCuota)}`,
      size: 250,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      filterFn: "includesString",
      // Cell: ({ cell }) => `${getFechaString(cell.row.original.ultimaCuota)}`,
      size: 100,
    },
  ];
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-refresh",
      label: "Baja de Mensualizacion",

      fn: (data) => {
        setDataConsulta({
          url: "/api/menusalizaciones/bajaMenusal",
          data,
        });
      },
    },
  ];
  const clickMenu = (inscripto) => {
    console.log(inscripto);
    setDataSeleccion(inscripto);
  };
  const getCols = () => {
    let arr = [];
    for (let index = 1; index <= 31; index++)
      arr.push({ dia: `${index}`.padStart(2, "0") });

    return arr;
  };
  const successQuery = (data, res) => {
    setDataExternal(res.data);
  };
  const imprimirIntegrantes = () => {
    setOpenImpresion(true);
    console.log(inscriptos);
    setDataImpresion({ inscriptos, colsDias: getCols() });
  };
  const aceptarDeudas = () => {
    setSeleccion(tableInstanceRef.current?.getSelectedRowModel().rows);
    setOpenNuevoMovimiento(true);
  };
  const cargoMovimiento = () => {
    setOpenDrawer(true);
    setOpenNuevoMovimiento(false);
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
          <Typography variant="h6" gutterBottom>
            {`${actividad?.nombreActividad} / ${grupo?.nombreGrupo} / Inscriptos`}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={imprimirIntegrantes}>
            <Icon className="fas fa-print" sx={{ mr: 1 }} /> planilla asistencia
          </Button>
        </Grid>
        <Grid item md={12}>
          <ABMColeccion2
            coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/integrantes`}
            columns={columns}
            acciones={acciones}
            maxWidth={"md"}
            dataExternal={{ data: dataExternal }}
            // where={[
            //   parentData
            //     ? ["idUsuario", "==", localStorage.getItem("usermod")]
            //     : ["usermod", "==", fuego.auth().currentUser?.uid],
            //   ["esActividad", "==", true],
            //   ["estado", "==", "PENDIENTE"],
            //   ["idGrupoActividad", "==", grupo?.id],
            // ]}
            gridOptions={{
              renderTopToolbarCustomActions: () => (
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <Button onClick={aceptarDeudas}>
                      <Icon sx={{ mr: 1 }} className="fas fa-check-circle" />{" "}
                      aceptar seleccion
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenDrawer(true);
                      }}
                    >
                      <Icon sx={{ mr: 1 }} className="fas fa-book" />
                      operaciones
                    </Button>
                  </Grid>
                </Grid>
              ),
              tableInstanceRef,

              renderDetailPanel: ({ row }) => {
                return (
                  <Box
                    sx={{
                      display: "grid",
                      margin: "auto",
                      gridTemplateColumns: "1fr 1fr",
                      width: "100%",
                    }}
                  ></Box>
                );
              },
              initialState: { showColumnFilters: false },
              enableRowSelection: false,
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
            // callbackclick={callbackclick}
            icono={"fas fa-users"}
            Modelo={Modelo}
            valoresIniciales={valoresIniciales}
            // dataForm={{ grupo: seleccion }}
            titulo={`PREDEUDA`}
            Form={Form}
          />
        </Grid>
        <ImpresionDialog
          titulo="IMPRESIÓN ASISTENCIAS"
          setOpen={setOpenImpresion}
          open={openImpresion}
          asunto="ASISTENCIAS "
          data={dataImpresion}
          plantilla={plantilla}
        />
      </Grid>
      <QueryApi callbackSuccess={successQuery} dataConsulta={dataConsulta} />
    </DialogContenido>
  );
}
