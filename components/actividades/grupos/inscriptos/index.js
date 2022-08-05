import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import { Grid, Typography } from "@mui/material";

export default function InscriptosGrupo({ open, setOpen, actividad, grupo }) {
  const callbackclick = (data) => {
    console.log(data);
  };

  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
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

        <Grid item md={12}>
          <ColeccionTable
            acciones={acciones}
            callbackclick={callbackclick}
            columns={columns}
            orderBy="apellido"
            coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/integrantes/`}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
