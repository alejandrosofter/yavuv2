import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

import SwitchFormik from "@components/forms/switch";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { Formik, Form } from "formik";
import { Icon } from "@mui/material";

export default function _FormItemAccion({
  dataModulo,
  modelo,
  clickAceptar,
  valoresIniciales,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input campo="nombre" label="Nombre" />
      </Grid>
      <Grid item md={6}>
        <Input campo="label" label="Label" />
      </Grid>
      <Grid item md={3}>
        <Input campo="icono" label="Icono" />
      </Grid>
      <Grid item md={3}>
        <Input campo="method" label="Metodo" />
      </Grid>
      <Grid item md={6}>
        <Input campo="descripcion" label="Descripcion" />
      </Grid>
      <Grid item md={6}>
        <Input campo="url" label="Url" />
      </Grid>
      <Grid item md={6}>
        <Input campo="color" label="Color" />
      </Grid>
      <Grid item md={3}>
        <SwitchFormik label="Es Registro? " campo="esRegistro" />
      </Grid>
      <Grid item md={3}>
        <SwitchFormik label="Es Funcion? " campo="esFuncion" />
      </Grid>
      <Grid item md={3}>
        <SwitchFormik label="Con confirmación? " campo="conConfirmacion" />
      </Grid>
    </Grid>
  );
}
