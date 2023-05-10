import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";

import SelectMedicamentos from "./selectMedicamento";
import SelectPosologias from "@pages/medicamentos/selectPosologia";

export default function FormMedicamentos({ mod, setFieldValue, values }) {
  const cambiaMedicamento = (valor, item) => {
    if (item) {
      setFieldValue("idPosologia", `${item.idPosologia}`);
      setFieldValue("label_idPosologia", `${item.label_idPosologia}`);
      setFieldValue("nombreMedicamento", `${item.nombre}`);
      setFieldValue("nombreGenerico", `${item.nombreGenerico}`);
      setFieldValue("laboratorio", `${item.laboratorio}`);
    }
  };
  const cambiaPosologia = (valor, item) => {
    if (item) {
      setFieldValue(
        "posologia",
        `${item.cantidad} ${item.presentacion} cada ${item.hrs} HRS`
      );
    }
  };
  return (
    <Grid spacing={2} container>
      <Grid item md={2}>
        <Input label="Cant." campo="cantidad" />
      </Grid>
      <Grid item md={5}>
        <SelectMedicamentos callbackchange={cambiaMedicamento} />
      </Grid>
      <Grid item md={5}>
        <SelectPosologias callbackchange={cambiaPosologia} />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
