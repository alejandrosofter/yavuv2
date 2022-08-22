import { Button, Grid, Icon } from "@mui/material";
import ItemsCobro from "@components/cobros/_items";

export default function Modulo({ mod, setFieldValue, values }) {
  const clickTraer = () => {
    let deudas = [];
    if (values.mensualizado)
      values.mensualizado.map((item) => {
        deudas.push({
          id: item.id,
          cantidad: 1,
          label_idProducto: item.label_idProducto,
          idProducto: item.idProducto,
          importe: Number(item.idProducto_importe),
          importeBonificacion: 0,
        });
      });

    if (values.tarjetas?.length > 0)
      for (let tarjeta of values.tarjetas) {
        const configTarjeta = mod.config;
        deudas.push({
          id: `${tarjeta.id}-${new Date().getTime()}`,
          cantidad: 1,
          label_idProducto: configTarjeta.label_productoCredencial,

          idProducto: configTarjeta.productoCredencial,
          importe: Number(configTarjeta.productoCredencial_importe),
          importeBonificacion: 0,
        });
      }

    setFieldValue("deudas", deudas);
  };
  return (
    <Grid justifyContent="flex-end" alignItems="flex-end" container>
      <Grid item xs={2}>
        <Button onClick={clickTraer} variant="contained">
          <Icon className="fas fa-dollar" /> TRAER ITEMS
        </Button>
      </Grid>
      <Grid item xs={12}>
        <ItemsCobro values={values} setFieldValue={setFieldValue} />
      </Grid>
    </Grid>
  );
}
