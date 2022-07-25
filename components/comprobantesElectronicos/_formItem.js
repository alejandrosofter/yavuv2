import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Input from "../forms/input";
import SelectProducto from "@components/productos/selectProducto";
export default function FormItem({ values }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal((values.cantidad * values.importe).toFixed(2));
  }, [values]);
  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <Input campo="cantidad" label="Cant" />
      </Grid>
      <Grid item md={6}>
        <SelectProducto label="Producto" />
      </Grid>

      <Grid item md={2}>
        <Input campo="importe" label="Importe" />
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
