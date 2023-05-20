import ABMColeccion2 from "@components/forms/ABMcollection2";
import DialogContenido from "@components/forms/dialogContenido";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { Grid, Typography, Button, Icon } from "@mui/material";
import { ModeloMensualizado, valoresMensualizado } from "@modelos/ModeloSocios";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useRef, useState } from "react";
import { getFechaString } from "@helpers/dates";
import { Box } from "@mui/system";
import Form from "./_form";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function InscriptosGrupo({ open, setOpen, actividad, grupo }) {
  const config = UseConfigModulo("actividades");
  const idPlantilla = config?.plantillaAsistencias;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
  const [dataExternal, setDataExternal] = useState([]);
  const tableInstanceRef = useRef();
  const [seleccion, setSeleccion] = useState();
  const [openNuevoMovimiento, setOpenNuevoMovimiento] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [inscriptos, setInscriptos] = useState([]);

  const { data, error } = useCollection(
    `actividades/${actividad?.id}/grupos/${grupo?.id}/integrantes`,
    {
      listen: true,
      orderBy: ["apellido", "asc"],
    }
  );
  useEffect(() => {
    setDataExternal(data);
  }, [data]);
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const order = ["apellido", "asc"];

  const callbackclick = (data) => {};
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
      accessorKey: "fechaInicio",
      header: "Prox. Cuota",
      filterFn: "includesString",
      Cell: ({ cell }) => `${getFechaString(cell.row.original.fechaInicio)}`,
      size: 150,
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
          <Box spacing={1} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ color: "#ccc", pr: 1 }} gutterBottom>
              {`${actividad?.nombreActividad} /`}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {` ${grupo?.nombreGrupo} `}
            </Typography>
          </Box>
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
            dataExternal={dataExternal}
            where={[]}
            // where={[
            //   parentData
            //     ? ["idUsuario", "==", localStorage.getItem("usermod")]
            //     : ["usermod", "==", fuego.auth().currentUser?.uid],
            //   ["esActividad", "==", true],
            //   ["estado", "==", "PENDIENTE"],
            //   ["idGrupoActividad", "==", grupo?.id],
            // ]}
            gridOptions={{
              // renderTopToolbarCustomActions: () => <Grid container></Grid>,
              tableInstanceRef,
              muiSelectCheckboxProps: ({ row }) => {
                return {
                  color: "secondary",
                  disabled: true,
                };
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
    </DialogContenido>
  );
}
