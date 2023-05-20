import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import SelectFile from "@components/forms/fileAnyUploadFormik";

import SelectFecha from "@components/forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function FormImputa({ mod }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <SelectFecha campo="fecha" label="Fecha" />
      </Grid>
      <Grid item md={3}>
        <SelectFile
          folder={`debitoAutomatico/`}
          campo="archivo"
          label="Archivo"
        />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "PROCESADO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
    </Grid>
  );
}
