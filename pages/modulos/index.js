import ABMColeccion from "@components/forms/ABMcollection2";
import TitulosFormularios from "@components/forms/tituloFormularios";
import Modelo, { valoresIniciales } from "@modelos/ModeloModulos";
import { Icon, Typography, Grid, Stack } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import Form from "@components/modulos/_form";
export default function Modulo({ mod }) {
  const columns = [
    {
      accessorKey: "label",
      header: "Modulo",
      size: 250,
      Cell: ({ cell }) => {
        return (
          <Stack spacing={1} direction="row">
            <Icon size="small" className={cell.row.original.icono} />
            <Typography variant="h5"> {`${cell.getValue()}`}</Typography>
          </Stack>
        );
      },
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      size: 480,
      Cell: ({ cell }) =>
        cell.getValue()
          ? cell
              .getValue()
              .map((item) => item.label)
              .join(", ")
          : "",
    },
  ];
  const order = ["label", "asc"];

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
          acciones={[]}
          where={[["idUsuario", "==", fuego.auth().currentUser?.uid]]}
          labelNuevo="nueva"
          preData={{}}
          orderBy={order}
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
