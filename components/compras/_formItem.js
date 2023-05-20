import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Input from "@components/forms/input";

export default function FormItem({ values }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal((values.cantidad * values.importe).toFixed(2));
  }, [values]);
  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <Input campo="codigo" label="Codigo" />
      </Grid>
      <Grid item md={6}>
        <Input campo="detalle" label="Detalle" />
      </Grid>
      <Grid item md={1}>
        <Input campo="cantidad" label="Cant" />
      </Grid>

      <Grid item md={2}>
        <Input campo="importe" label="Importe" />
      </Grid>
      <Grid item md={2}>
        TOTAL {total}
      </Grid>
    </Grid>
  );
}
