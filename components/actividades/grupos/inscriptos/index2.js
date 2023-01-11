import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import ImpresionDialog from "@components/forms/impresion";
import NuevoGenerico from "@components/NuevoGenerico2";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import PerfilSocio from "@components/socios/perfilSocio";
import { getModUsuario } from "@helpers/db";
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
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
export default function InscriptosGrupo({
  open,
  setOpen,
  actividad,
  grupo,
  mod,
}) {
  const idPlantilla = mod.config?.plantillaAsistencias;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataSeleccion, setDataSeleccion] = useState();
  const [inscriptos, setInscriptos] = useState([]);

  const { data, error } = useCollection(
    `actividades/${actividad?.id}/grupos/${grupo?.id}/integrantes`,
    {
      listen: true,
      orderBy: ["apellido", "asc"],
    }
  );
  const modSocio = getModUsuario("socios");
  console.log(modSocio);
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
      field: "label_socio",
      headerName: "Inscripto",
      width: 200,
      renderCell: (params) => `${params.row.apellido} ${params.row.nombre}`,
    },

    {
      field: "label_idProducto",
      headerName: "Producto asociado",
      width: 250,
    },
    {
      field: "label_tipoPeriodo",
      headerName: "Periodo",
      width: 220,
    },
    {
      field: "dni",
      headerName: "DNI",
      width: 120,
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-pencil",
    //   label: "Editar",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenEditar(true);
    //   },
    // }
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
  const imprimirIntegrantes = () => {
    setOpenImpresion(true);
    console.log(inscriptos);
    setDataImpresion({ inscriptos, colsDias: getCols() });
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
        <Grid item md={3}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Listado de Inscriptos ({data?.length})
              </ListSubheader>
            }
          >
            {data?.map((inscripto) => (
              <ListItemButton
                onClick={clickMenu.bind(this, inscripto)}
                key={inscripto.id}
              >
                <ListItemText
                  primary={`${inscripto.apellido} ${inscripto.nombre}`}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid item md={9}>
          <AppBar
            style={{ background: "#fff", color: "#000" }}
            position="sticky"
          >
            <PerfilSocio
              style={{ position: "sticky" }}
              socio={{ objectID: dataSeleccion?.idSocio }}
              mod={modSocio}
            />
          </AppBar>
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
