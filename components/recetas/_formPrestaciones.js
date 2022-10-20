import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectPrestaciones from "@components/prestaciones/selectPrestacion";

export default function FormPrestaciones({
  mod,
  setFieldValue,
  values,
  obraSocial,
}) {
  const cambiaPrestacion = (valor, item) => {
    if (item) {
      setFieldValue("codigo", `${item.codigoInterno}`);
      setFieldValue("nombre", `${item.nombre}`);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <Input label="Cantidad" campo="cantidad" />
      </Grid>
      <Grid item md={8}>
        <SelectPrestaciones
          callbackchange={cambiaPrestacion}
          obraSocial={obraSocial}
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
