import { Grid, Icon } from "@mui/material";

import { GridActionsCellItem } from "@mui/x-data-grid";
import UploadAnyFormik from "@components/forms/fileAnyUploadFormik";
export default function FormRespuestaBanco({ setFieldValue, values }) {
  return (
    <Grid sx={{ pt: 1, mb: 2 }} md={12} container rowSpacing={2} spacing={2}>
      <Grid item md={3}>
        <UploadAnyFormik
          folder={`debitoAutomatico/${values.idDebito}/`}
          label="Archivo"
          campo="archivo"
        />
      </Grid>
    </Grid>
  );
}
