import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
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
            <Switch label="Es Servicio?" campo="esServicio" />
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
            <Switch label="Es Gravado " campo="esGravado" />
          </Grid>
          <Grid item xs={2}>
            <Switch label="Es Cuota Social " campo="esSocial" />
          </Grid>
          <Grid item xs={2}>
            <Switch label="Es Actividad " campo="esActividad" />
            <Typography variant="caption" color="text.secondary">
              Importante para enviar mensualizacion a su actividad
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Input label="Detalle" campo="detalle" />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
