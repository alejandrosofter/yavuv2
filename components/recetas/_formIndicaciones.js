import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectIndicacion from "./selectIndicacion";

export default function FormIndicaciones({ mod, setFieldValue, values }) {
  const cambiaIndicacion = (valor, item) => {
    if (item) {
      setFieldValue("detalleIndicacion", `${item.detalle}`);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={8}>
        <SelectIndicacion callbackchange={cambiaIndicacion} />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
