import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import ImpresionDialog from "@components/forms/impresion";
import NuevoGenerico from "@components/NuevoGenerico2";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import { Grid, Typography, Button, Icon } from "@mui/material";
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
  const [inscriptos, setInscriptos] = useState([]);

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
      maxWidth="md"
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
          <ColeccionTable
            acciones={acciones}
            callbackclick={callbackclick}
            columns={columns}
            callbackchangedata={changeData}
            orderBy={order}
            coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/integrantes/`}
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
