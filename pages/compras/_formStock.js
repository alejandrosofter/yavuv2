import SelectCategoriaProducto from "@components/productos/categoriaProducto";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Input from "@components/forms/input";
import ImageFormik from "@components/forms/imageFormik";
import { fuego } from "@nandorojo/swr-firestore";
export default function FormItem({ values }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal((values.cantidad * values.importe).toFixed(2));
  }, [values]);
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <ImageFormik
          w={300}
          h={300}
          iconDefault="fas fa-images"
          folder={`users/${fuego.auth().currentUser?.uid}/productos`}
          label="Foto "
          campo={`foto`}
        />
      </Grid>
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
        <Input campo="importeVenta" label="$ Venta" />
      </Grid>
      <Grid item md={3}>
        <SelectCategoriaProducto />
      </Grid>
      <Grid item md={2}>
        TOTAL {total}
      </Grid>
    </Grid>
  );
}
