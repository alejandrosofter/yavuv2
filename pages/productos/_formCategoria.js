import { Grid, Stack } from "@mui/material";
import CheckboxForm from "@components//forms/checkbox";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectCentroCosto from "@pages/centroCostos/select";
import { Grid3x3 } from "@mui/icons-material";
export default function Form({ mod, setFieldValue, values }) {
  const { data: centrosCosto } = useCollection("centroCostos", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });

  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <Input label="Nombre" campo="nombre" />
      </Grid>

      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
