import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

import SelectProducto from "../productos/selectProducto";

export default function FormularioItemCobro({ setFieldValue, mod, values }) {
  const cambiaProducto = (producto, item) => {
    setFieldValue("importe", item.importe);
    setFieldValue("esGravado", item.esGravado);
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <Input campo="cantidad" label="Cant." />
      </Grid>
      <Grid item md={7}>
        <SelectProducto callbackchange={cambiaProducto} label="Producto" />
      </Grid>
      <Grid item md={2}>
        <Input campo="importe" label="Importe" />
      </Grid>
      <Grid item md={2}>
        <Input campo="importeBonificacion" label="$ Bonif." />
      </Grid>
      <Grid item md={12}>
        <Input campo="detalle" label="Detalle" />
      </Grid>
    </Grid>
  );
}
