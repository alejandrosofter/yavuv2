import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import { formatMoney } from "@helpers/numbers";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import { Grid, Typography } from "@mui/material";

export default function ItemsDebitoAutomatico({ open, setOpen, debito }) {
  const order = ["titular", "asc"];
  const callbackclick = (data) => {
    console.log(data);
  };

  const columns = [
    {
      field: "cbu",
      headerName: "CBU",
      width: 180,
    },
    {
      field: "titular",
      headerName: "Titular",
      width: 200,
    },

    {
      field: "label_idProducto",
      headerName: "Producto/Servicio",
      width: 250,
    },
    {
      field: "idProducto_importe",
      headerName: "$ Importe",
      width: 100,
      renderCell: (params) => `${formatMoney(params.value)}`,
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
            {`TITULARES DE DEBITO AUTOMATICO`}
          </Typography>
        </Grid>

        <Grid item md={12}>
          <ColeccionTable
            columns={columns}
            orderBy={order}
            coleccion={`debitoAutomatico/${debito?.id}/deudas/`}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
