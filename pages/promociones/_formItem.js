import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

import { useEffect, useState } from "react";
import SelectFormik from "@components/forms/select";
import { getItemArray } from "../../helpers/arrays";
import SelectProducto from "../productos/selectProducto";
const getItemsConceptos = (id, arr) => {
  const item = getItemArray({ data: arr, valor: id, campoId: "id" });

  if (item && item.config && item.config.itemsTipos)
    return item.config.itemsTipos;
  return [];
};
export default function FormularioItemPromocion({ modsDeuda, values }) {
  const [itemsConceptos, setItemsConceptos] = useState();
  const [conceptoSeleccion, setConceptoSeleccion] = useState();
  useEffect(() => {
    setItemsConceptos(getItemsConceptos(values.modDeuda, modsDeuda));
    // cambiaConcepto(values.concepto)
  }, [modsDeuda, values.modDeuda]);

  const cambiaMod = (id) => {
    setItemsConceptos(getItemsConceptos(id, modsDeuda));
  };
  const cambiaConcepto = (id) => {
    const itemMod = getItemArray({
      data: modsDeuda,
      valor: values.modDeuda,
      campoId: "id",
    });
    const itemConcepto = getItemArray({
      data: itemMod.config.itemsTipos,
      valor: id,
      campoId: "id",
    });

    if (itemConcepto) {
      setConceptoSeleccion(itemConcepto);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={5}>
        <SelectProducto />
      </Grid>
      <Grid item md={3}>
        <Input campo="importe" label="Aplica Importe..." />
      </Grid>
      <Grid item md={3}>
        <Input campo="porcentaje" label="Aplica %..." />
      </Grid>
      <Grid item md={12}>
        <Input campo="detalle" label="Detalle" />
      </Grid>
    </Grid>
  );
}
