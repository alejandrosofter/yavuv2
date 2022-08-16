import { Grid, Icon, Typography } from "@mui/material";

import { GridActionsCellItem } from "@mui/x-data-grid";
import UploadAnyFormik from "@components/forms/fileAnyUploadFormik";
export default function FormRespuestaBanco({ setFieldValue, values }) {
  return (
    <Grid container sx={{ p: 3 }} spacing={2}>
      <Grid item md={12}>
        <Typography variant="caption">
          **IMPORTANTE: es importante que sepas que al cargar y aplicar una
          respuesta de banco automaticamente se modificaran los perfiles de cada
          socio.
        </Typography>
      </Grid>
      <Grid item md={12}>
        <UploadAnyFormik
          folder={`debitoAutomatico/${values.idDebito}/`}
          label="Archivo"
          campo="archivo"
        />
      </Grid>
    </Grid>
  );
}
