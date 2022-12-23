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
      <Grid item md={2}>
        <WebcamFormik
          folder={`users/${fuego.auth().currentUser?.uid}/pacientes`}
          label="Foto "
          campo="foto"
        />
      </Grid>
      <Grid md={10} spacing={2} item container>
        <Grid item md={2}>
          <Input label="Nombre" campo="nombre" />
        </Grid>
        <Grid item md={2}>
          <Input label="Apellido" campo="apellido" />
        </Grid>
        <Grid item md={2}>
          <Input label="D.N.I" campo="dni" />
        </Grid>
        <Grid item md={3}>
          <Input label="Nro Afiliado" campo="nroAfiliado" />
        </Grid>
        <Grid item md={3}>
          <Input label="Nro Credencial" campo="nroCredencial" />
        </Grid>
        <Grid sx={{ pr: 1 }} item md={4}>
          <InputTelefono label="Teléfono" campo="telefono" />
        </Grid>
        <Grid item md={4}>
          <Input label="Email" campo="email" />
        </Grid>
        <Grid item md={4}>
          <SelectObraSocial />
        </Grid>
        <Grid item md={3}>
          <SelectEstaticFormik
            items={["ACTIVO", "INACTIVO"]}
            label="Estado"
            campo="estado"
          />
        </Grid>
        <Grid item md={12}>
          <Input label="Detalle" campo="detalle" />
        </Grid>
      </Grid>
    </Grid>
  );
}
