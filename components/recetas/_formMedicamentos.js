import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectMedicamentos from "./selectMedicamento";
import SelectPosologias from "@components/medicamentos/selectPosologia";

export default function FormMedicamentos({ mod, setFieldValue, values }) {
  const cambiaMedicamento = (valor, item) => {
    setFieldValue("idPosologia", item.idPosologia);
  };
  return (
    <Grid spacing={2} container>
      <Grid item md={6}>
        <SelectMedicamentos callbackchange={cambiaMedicamento} />
      </Grid>
      <Grid item md={6}>
        <SelectPosologias />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
