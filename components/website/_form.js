import FormGenerico from "@components/_formGenerico";
import Input from "@components/forms/input";
import SwitchFormik from "@components/forms/switch";
import { Button, Grid, Typography } from "@mui/material";
import Modelo, { valoresIniciales } from "@modelos/ModeloWebsite";
export default function Form({ data, fnUpdate, callbackSuccess }) {
  return (
    <FormGenerico
      fnUpdate={fnUpdate}
      modelo={Modelo}
      valoresIniciales={valoresIniciales}
      datos={data}
      callbackSuccess={callbackSuccess}
    >
      <Grid container>
        <Grid
          sx={{ pt: 1, pb: 1 }}
          md={12}
          container
          rowSpacing={2}
          spacing={2}
        >
          <Grid item md={2}>
            <Input label="Nombre" campo="nombre" />
          </Grid>
          <Grid item md={2}>
            <Input disabled={false} label="Token" campo="token" />
          </Grid>

          <Grid item md={7}>
            <Input label="Detalle" campo="detalle" />
          </Grid>
          <Grid item md={5}>
            <SwitchFormik
              label="Habilitar Productos"
              campo="productosEnabled"
            />
            <Typography variant="caption">Habilita productos</Typography>
          </Grid>
        </Grid>
      </Grid>
    </FormGenerico>
  );
}
