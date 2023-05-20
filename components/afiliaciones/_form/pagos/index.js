import { Button, Grid, Icon } from "@mui/material";
import ItemsCobro from "@components/cobros/_items";
import { useDocument } from "@nandorojo/swr-firestore";
import PersonalizarComprobante from "@components/cobros/_personalizarComprobante";
import { useState } from "react";
import { UseConfigModulo } from "@helpers/useConfigModulo";

export default function Modulo({ mod, setFieldValue, values }) {
  const [openPersonalizar, setOpenPersonalizar] = useState();
  const config = UseConfigModulo("afiliaciones");
  const { data: producto } = useDocument(
    `productos/${config.productoCredencial}`
  );

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
        deudas.push({
          id: `${tarjeta.id}-${new Date().getTime()}`,
          cantidad: 1,
          label_idProducto: configTarjeta.label_productoCredencial,

          idProducto: configTarjeta.productoCredencial,
          importe: Number(producto.importe),
          importeBonificacion: 0,
        });
      }

    setFieldValue("deudas", deudas);
  };

  return (
    <Grid justifyContent="flex-end" alignItems="flex-end" container>
      <Grid item xs={4}>
        <PersonalizarComprobante
          field="comprobante"
          setFieldValue={setFieldValue}
          open={openPersonalizar}
          setOpen={setOpenPersonalizar}
          values={values}
        />
      </Grid>
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
