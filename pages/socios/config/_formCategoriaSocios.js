import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "../@components/forms/select2Formik";
export default function FormCategoriaSocio({
  dataModulo,
  modelo,
  clickAceptar,
  valoresIniciales,
}) {
  const { data: productos } = useCollection("productos", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  if (!productos) return "";
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input campo="nombre" label="Nombre" />
      </Grid>
      <Grid item md={6}>
        <Select2
          campo="idProducto"
          label="Producto Asociado"
          lista={productos}
          campoId="id"
          campoLabel="nombre"
        />
      </Grid>
      <Grid item md={12}>
        <Input campo="condicion" label="Condicion" />
      </Grid>
    </Grid>
  );
}
