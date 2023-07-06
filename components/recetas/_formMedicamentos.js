import { Button, Grid, Icon, Stack } from "@mui/material";
import Input from "@components/forms/input";

import SelectMedicamentos from "@components/recetas/selectMedicamento";
import SelectPosologias from "@components/medicamentos/selectPosologia";
import { useState } from "react";
import SelectMedicamentos2 from "./selectMedicamento2";

export default function FormMedicamentos({ mod, setFieldValue, values }) {
  const [openSelectMedicamento, setOpenSelectMedicamento] = useState(false);
  const cambiaMedicamento = (valor, item) => {
    console.log(item);
    if (item) {
      setFieldValue("idPosologia", `${item.idPosologia}`);
      setFieldValue("label_idPosologia", `${item.label_idPosologia}`);
      setFieldValue("nombreMedicamento", `${item.nombre}`);
      setFieldValue("nombreGenerico", `${item.nombreGenerico}`);
      setFieldValue("laboratorio", `${item.laboratorio}`);
    }
  };
  const cambiaMedicamento2 = (item) => {
    if (item) {
      setFieldValue("idPosologia", `${item.idPosologia}`);
      setFieldValue("label_idPosologia", `${item.label_idPosologia}`);
      setFieldValue("nombreMedicamento", `${item.nombre}`);
      setFieldValue("nombreGenerico", `${item.nombreGenerico}`);
      setFieldValue("laboratorio", `${item.laboratorio}`);
      setFieldValue("idMedicamento", `${item.id}`);
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
      <Grid item md={1}>
        <Button>
          <Icon
            onClick={() => setOpenSelectMedicamento(true)}
            className="fas fa-eye"
          />
        </Button>
      </Grid>
      <Grid item md={4}>
        <SelectPosologias callbackchange={cambiaPosologia} />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
      <SelectMedicamentos2
        open={openSelectMedicamento}
        setFieldValue={setFieldValue}
        onSelect={cambiaMedicamento2}
        setOpen={setOpenSelectMedicamento}
      />
    </Grid>
  );
}
