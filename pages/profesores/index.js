import ABMColeccion from "@components/forms/ABMcollection";
import ColeccionTable from "@components/forms/coleccionTable";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloProfesores";
import Form from "./_form";
export default function Modulo({ mod }) {
  const order = ["apellido"];
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 190,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 190,
    },
    {
      field: "dni",
      headerName: "DNI",
      width: 190,
    },
  ];
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <TitulosFormularios
          titulo="PROFESORES"
          icono="fas fa-users"
          subTitulo="Lista de profesores"
        />
      </Grid>
      <Grid item md={12}>
        <ABMColeccion
          maxWidth="lg"
          where={[["usermod", "==", fuego.auth().currentUser?.uid]]}
          coleccion={`profesores`}
          columns={columns}
          // acciones={acciones}
          order={order}
          // callbackclick={callbackclick}
          icono={"fas fa-users"}
          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
