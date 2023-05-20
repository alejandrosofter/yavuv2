import { Grid, Stack } from "@mui/material";
import CheckboxForm from "@components//forms/checkbox";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectCentroCosto from "@components/centroCostos/select";
import SelectCategoriaProducto from "./categoriaProducto";
export default function Form({ mod, setFieldValue, values }) {
  const { data: centrosCosto } = useCollection("centroCostos", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });

  return (
    <Grid>
      <Stack>
        <Grid
          sx={{ pt: 1, pb: 1 }}
          md={12}
          container
          rowSpacing={2}
          spacing={2}
        >
          <Grid item xs={2}>
            <CheckboxForm label="Es Servicio?" campo="esServicio" />
          </Grid>

          <Grid item md={2}>
            <Input label="Cantidad" campo="cantidad" />
          </Grid>
          <Grid item md={4}>
            <Input label="Nombre" campo="nombre" />
          </Grid>

          <Grid item md={2}>
            <Input label="Importe" campo="importe" />
          </Grid>
          <Grid item md={3}>
            <SelectEstaticFormik
              items={["ACTIVO", "INACTIVO"]}
              label="ESTADO"
              campo="estado"
            />
          </Grid>
          {/* <Grid item md={3}>
            <SelectCentroCosto />
          </Grid> */}
          <Grid item md={2}>
            <Input label="Codigo Contable" campo="codigoContable" />
          </Grid>
          <Grid item md={3}>
            <SelectCategoriaProducto />
          </Grid>
          <Grid item xs={2}>
            <CheckboxForm label="Es Gravado " campo="esGravado" />
          </Grid>
          <Grid item md={12}>
            <Input label="Detalle" campo="detalle" />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
