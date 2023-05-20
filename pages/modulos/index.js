import ABMColeccion from "@components/forms/ABMcollection";
import TitulosFormularios from "@components/forms/tituloFormularios";
import Modelo, { valoresIniciales } from "@modelos/ModeloModulos";
import { Icon, Typography, Grid, Stack } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import Form from "@components/modulos/_form";
export default function Modulo({ mod }) {
  const columns = [
    {
      field: "icono",
      headerName: "Modulo",
      width: 250,
      renderCell: (params) => {
        return (
          <Stack spacing={1} direction="row">
            <Icon size="small" className={params.formattedValue} />
            <Typography variant="h5"> {`${params.row.label}`}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 480,
      renderCell: (params) =>
        params.value ? params.value.map((item) => item.label).join(", ") : "",
    },
  ];
  const order = ["nombre", "asc"];
  const parentData = true;
  return (
    <Grid container>
      <Grid item xs={12}>
        {" "}
        <TitulosFormularios titulo="MODULOS" icono="fas fa-cube" />
      </Grid>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`modulos`}
          columns={columns}
          where={[["idUsuario", "==", fuego.auth().currentUser?.uid]]}
          labelNuevo="nueva"
          preData={{}}
          order={order}
          maxWidth={"lg"}
          // callbackclick={callbackclick}
          icono={"fas fa-"}
          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          dataForm={{}}
          titulo={``}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
