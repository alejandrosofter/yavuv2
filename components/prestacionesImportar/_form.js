import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import UploadAnyFormik from "@components/forms/fileAnyUploadFormik";
import { fuego } from "@nandorojo/swr-firestore";
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
          <Grid item md={2}>
            <SelectFecha label="Fecha" campo="fecha" />
          </Grid>
          <Grid item md={4}>
            <SelectObraSocial />
          </Grid>
          <Grid item md={2}>
            <SelectEstaticFormik
              items={["PENDIENTE", "FINALIZADO"]}
              label="Estado"
              campo="estado"
            />
          </Grid>
          <Grid item md={4}>
            <UploadAnyFormik
              folder={`users/${
                fuego.auth().currentUser.uid
              }/prestacionesImportar`}
              label="Archivo"
              acceptFiles={".xlsx"}
              campo="archivo"
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="caption">
              IMPORTANTE! el archivo debe ser .XLSX (no es lo mismo XLS)!
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
