import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { Grid } from "@mui/material";
import Input from "@components/forms/input";

export default function Form({ setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={3}>
        <Input label="Campo" campo="nombreCampo" />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={[">", "<", "==", "!="]}
          label="Condicion"
          campo="condicion"
        />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["string", "number", "date"]}
          label="Tipo Dato"
          campo="tipoDato"
        />
      </Grid>
    </Grid>
  );
}
