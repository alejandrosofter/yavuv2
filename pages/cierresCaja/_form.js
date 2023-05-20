import { Grid, Typography } from "@mui/material";
import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import SelectFormaPago from "@pages/formaPagos/selectFormaPago";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectPuntoVenta from "@pages/comprobantesElectronicos/selectorPuntoVenta";
import { useEffect } from "react";
export default function FormMensualizado({ values, setFieldValue }) {
  // useEffect(() => {
  //   if (!values.exists)
  //     setFieldValue("puntoVenta", localStorage.getItem("puntoVenta"));
  //   // if (values.puntoVenta) setFieldValue("puntoVenta", values.puntoVenta);
  // }, []);
  const cambiaPuntoVenta = (item, vals) => {
    if (item) {
      // localStorage.setItem("puntoVenta", item.value);
      setFieldValue("nroPuntoVenta", vals.nro);
      setFieldValue("label_puntoVenta", item.label);
    }
  };
  return (
    <Grid container sx={{ p: 2 }} spacing={2}>
      <Grid item md={12}>
        <Typography variant="caption">
          ** IMPORTANTE: es importante la fecha, ya que buscara todos los pagos
          que se hayan realizado en esa fecha
        </Typography>
      </Grid>
      <Grid item md={3}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>

      <Grid item md={3}>
        <SelectEstaticFormik
          items={["PENDIENTE", "OK", "FACTURADO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={5}>
        <SelectPuntoVenta
          callbackchange={cambiaPuntoVenta}
          campo={"puntoVenta"}
          label="Punto Venta"
        />
        <Typography variant="caption">
          ** IMPORTANTE: es importante para sacar informe contable
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Input label="Detalle (opcional) " campo="detalle" />
      </Grid>
    </Grid>
  );
}
