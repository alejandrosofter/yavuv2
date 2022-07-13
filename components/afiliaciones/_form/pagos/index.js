import { getFieldName } from "@helpers/forms";
import { Button, Grid, Icon } from "@mui/material";
import ItemsCobro from "../../../cobros/_items";

const getItemsCobro = (values) => {
  const items = [];
  values.map((item) => {
    items.push(item);
  });
  return items;
};

export default function Modulo({ mod, setFieldValue, values }) {
  const clickTraer = () => {
    let deudas = [];
    if (values.socio?.obligacionMensual)
      deudas.push({
        id: new Date().getTime(),
        cantidad: 1,
        label_idProducto: values.socio.label_obligacionMensual,
        idProducto: values.socio.obligacionMensual,
        importe: Number(values.socio.obligacionMensual_importe),
        importeBonificacion: 0,
      });

    if (values.actividades?.length > 0)
      for (let actividad of values.actividades) {
        deudas.push({
          id: `${actividad.id}-${new Date().getTime()}`,
          cantidad: 1,
          label_idProducto: actividad.label_idProducto,
          detalle: actividad.label_idActividad,
          idProducto: actividad.idProducto,
          importe: Number(actividad.idProducto_importe),
          importeBonificacion: 0,
        });
      }
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

    console.log(mod.config);
    setFieldValue("deudas", deudas);
  };
  return (
    <Grid container>
      <Grid item xs={8}>
        <ItemsCobro values={values} setFieldValue={setFieldValue} />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={clickTraer} variant="contained">
          <Icon className="fas fa-dollar" /> TRAER ITEMS
        </Button>
      </Grid>
    </Grid>
  );
}
