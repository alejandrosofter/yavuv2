import { Grid } from "@mui/material";

import Select from "@components/forms/select";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import ImageFormik from "@components/forms/imageFormik";
import { fuego } from "@nandorojo/swr-firestore";
import { getModUsuario } from "@helpers/db";
export default function FormDocumentosSocio({ mod }) {
  const modSocio = getModUsuario("socios", localStorage.getItem("usermod"));
  if (!modSocio) return "Aguarde...";
  return (
    <Grid container>
      <Grid item md={2} spacing={2}>
        <ImageFormik
          folder={`users/${fuego.auth().currentUser?.uid}/socios`}
          label="Imagen"
          campo="imagen"
        />
      </Grid>
      <Grid item xs container sx={{ ml: 4 }} md={8} spacing={2}>
        <Grid item md={8}>
          <Select
            label="Tipo"
            lista={modSocio.config.tiposDocumentacion}
            campoId="id"
            campoLabel="nombreTipoDocumentacion"
            campo="tipo"
          />
        </Grid>
        <Grid item md={6}>
          <SelectFecha label="Fecha Vto" campo="fechaVto" />
        </Grid>
      </Grid>
    </Grid>
  );
}
