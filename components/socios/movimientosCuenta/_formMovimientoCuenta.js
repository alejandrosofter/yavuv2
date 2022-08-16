import { Grid } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectProducto from "@components/productos/selectProducto";
import SelectFecha from "@components/forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function Form({ setFieldValue, values }) {
  const cambiaProducto = (producto, item) => {
    if (item) setFieldValue("importe", item.importe);
  };
  return (
    <Grid sx={{ p: 2 }} container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Vto" campo="fechaVto" />
      </Grid>
      <Grid item md={1}>
        <Input label="Cant. " campo="cantidad" />
      </Grid>
      <Grid item md={6}>
        <SelectProducto callbackchange={cambiaProducto} />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe" campo="importe" />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe Bonificacion" campo="importeBonificacion" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["PENDIENTE", "CANCELADO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <Switch label="Debito Automatico " campo="esPorDebitoAutomatico" />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
