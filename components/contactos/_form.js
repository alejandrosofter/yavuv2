import { Grid, Stack } from "@mui/material";
import Input from "../forms/input";
import WebcamFormik from "@components/forms/imageFormik";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import { fuego } from "@nandorojo/swr-firestore";
import InputTelefono from "@components/forms/inputTelefono";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={3}>
        <Input label="Apellido" campo="apellido" />
      </Grid>
      <Grid item md={3}>
        <InputTelefono label="Teléfono" campo="telefono" />
      </Grid>
      <Grid item md={3}>
        <Input label="Email" campo="email" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={9}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
