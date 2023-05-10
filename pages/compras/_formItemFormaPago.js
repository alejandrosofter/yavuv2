import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
import Switch from "../forms/switch";
import InputDate from "../forms/selectorFecha";
import { useState } from "react";
import SelectFormaPago from "@components/formaPagos/selectFormaPago";
export default function FormItem({ values }) {
  const { data: formaPagos } = useCollection("formaPagos", {
    where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
  });
  const [fechaVisible, setFechaVisible] = useState(values.tieneVto);
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <SelectFormaPago />
      </Grid>
      <Grid item md={2}>
        <Input campo="importe" label="Importe" />
      </Grid>
      <Grid item md={2}>
        <Switch
          callbackChange={() => setFechaVisible(!fechaVisible)}
          campo="tieneVto"
          label="Vto?"
        />
      </Grid>
      {fechaVisible && (
        <Grid item md={3}>
          <InputDate campo="fechaVto" label="Fecha Vto" />
        </Grid>
      )}
      <Grid item md={12}>
        <Input campo="detalle" label="Detalle" />
      </Grid>
    </Grid>
  );
}
