import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import UploadAnyFormik from "@components/forms/fileAnyUploadFormik";
import { fuego } from "@nandorojo/swr-firestore";
import SelectProducto from "@components/productos/selectProducto";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>

      <Grid item md={3}>
        <SelectEstaticFormik
          items={["PENDIENTE", "FINALIZADO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={6}>
        <SelectProducto label="Producto" campo="idProducto" />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe" campo="importe" />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe Bonif." campo="importeBonificacion" />
      </Grid>
    </Grid>
  );
}
