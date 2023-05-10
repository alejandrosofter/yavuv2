import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function FormGrupo({ mod, setFieldValue, values }) {
  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item md={6}>
        <Input label="Mercado" campo="mercado" />
      </Grid>

      <Grid item md={2}>
        <Input label="Importe (de operacion)" campo="importe" />
      </Grid>

      <Grid item md={4}>
        <SelectEstaticFormik
          items={["CAMBIO POSICION", "OPEN"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
    </Grid>
  );
}
