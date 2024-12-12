import ItemsModulo from "@components/forms/itemsModulo";
import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
import ColorPicker from "react-pick-color";
import ColorPickerFormik from "@components/forms/colorPickerForm";
export default function Form({ mod, setFieldValue, values }) {
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
          <Grid item md={4}>
            <Input label="Nombre" campo="nombre" />
          </Grid>

          <Grid item md={4}>
            <Input label="Email" campo="email" />
          </Grid>
          <Grid item md={3}>
            <SelectEstaticFormik
              items={["ACTIVO", "INACTIVO"]}
              label="Estado"
              campo="estado"
            />
          </Grid>
          <Grid item md={7}>
            <SelectPlantilla
              campo="plantillaLiquidaciones"
              label="Plantilla Liquidaciones"
            />
          </Grid>
          <Grid item md={7}>
            <ColorPickerFormik label="Color" campo="color" />
          </Grid>

          <Grid item md={2}>
            <Input label="Facturar desde dia..." campo="facturacionDesdeDia" />
          </Grid>
          <Grid item md={2}>
            <Input label="Facturar hasta dia..." campo="facturacionHastaDia" />
            <Typography variant="caption">
              Si el dia HASTA es menor al dia DESDE se deduce que es hasta el
              dia del proximo mes.
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
