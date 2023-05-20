import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import { Button, Grid, Typography } from "@mui/material";
export default function TomarAsistenciaGrupo({
  open,
  setOpen,
  actividad,
  grupo,
}) {
  const callbackclick = (data) => {};

  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };

  const columns = [
    {
      field: "label_socio",
      headerName: "Inscripto",
      width: 300,
      renderCell: (params) => `${params.row.apellido} ${params.row.nombre}`,
    },
  ];
  const clickAceptar = () => {};
  const cambiaSeleccionItems = (data, ids) => {};
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
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="sm"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={9}>
          <Typography variant="h6" gutterBottom>
            ASISTENCIA DE INSCRIPTOS
          </Typography>
        </Grid>

        <Grid item md={12}>
          <ColeccionTable
            acciones={acciones}
            callbackclick={callbackclick}
            fullWidth
            columns={columns}
            onSelectionModelChange={cambiaSeleccionItems}
            checkboxSelection
            orderBy="apellido"
            coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/integrantes/`}
          />
        </Grid>
        <Grid item md={12}>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            color="primary"
            onClick={clickAceptar}
          >
            ACEPTAR
          </Button>
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
