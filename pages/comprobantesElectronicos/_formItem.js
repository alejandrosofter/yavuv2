import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Input from "@components/forms/input";
import SelectProducto from "@components/productos/selectProducto";
export default function FormItem({ values, setFieldValue }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // console.log(values);
    if (values) setTotal((values.cantidad * values.importe).toFixed(2));
  }, [values]);
  const cambiaProducto = (data, item) => {
    if (item) setFieldValue("importe", Number(item.importe) * values.cantidad);
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <Input campo="cantidad" label="Cant" />
      </Grid>
      <Grid item md={6}>
        <SelectProducto callbackchange={cambiaProducto} label="Producto" />
      </Grid>

      <Grid item md={2}>
        <Input campo="importe" label="Importe" />
      </Grid>
      <Grid item md={2}>
        <Input campo="importeBonificacion" label="$ Bonif." />
      </Grid>
      <Grid item md={2}>
        TOTAL {total}
      </Grid>
      <Grid item md={12}>
        <Input campo="detalle" label="Detalle (opcional)" />
      </Grid>
    </Grid>
  );
}
