import { Grid } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectProducto from "@components/productos/selectProducto";
import SelectPromocion from "@components/promociones/selectPromocion";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function FormPromocionesSocio({ values, setFieldValue }) {
  const cambiaPromo = (valor, registro) => {
    let importe = 0;
    if (registro)
      registro.items.map((item) => {
        console.log(item, values.idProducto);
        if (item.idProducto === values.idProducto.value) {
          importe = importe + Number(item.importe);
          importe =
            importe +
            Number(values.idProducto_importe) * Number(item.porcentaje / 100);
        }
      });
    setFieldValue("importePromocion", importe.toFixed(2));
  };
  return (
    <Grid md={12} container rowSpacing={2} spacing={2}>
      <Grid item sx={{ flex: 1 }} md={4}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>

      <Grid item md={5}>
        <Switch label="Es Debito Automatico?" campo="esPorDebitoAutomatico" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["MENSUAL", "ANUAL"]}
          label="Periodicidad"
          campo="periodicidad"
        />
      </Grid>
      <Grid item md={12}>
        <SelectProducto />
      </Grid>
      <Grid item md={7}>
        <SelectPromocion callbackchange={cambiaPromo} />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
