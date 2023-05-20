import {
  CircularProgress,
  Grid,
  MenuItem,
  Tab,
  Typography,
} from "@mui/material";
import ImageFormik from "@components/forms/imageFormik";
import { useState, useEffect } from "react";
import Input from "@components/forms/input";
import { fuego, useDocument } from "@nandorojo/swr-firestore";
import SelectSocio from "@components/socios/selectSocio";

export default function FormTarjetasSocio({ setFieldValue, values }) {
  const { data: socio } = useDocument(`/socios/${values?.idSocio}`);
  useEffect(() => {
    if (socio)
      if (socio.exists) {
        setFieldValue("nombre", socio?.nombre);
        setFieldValue("apellido", socio?.apellido);
        setFieldValue("nroSocio", socio?.nroSocio);

        if (socio?.foto) {
          setFieldValue("foto", socio?.foto);
        }
      }
  }, [socio]);
  return (
    <Grid md={12} sx={{ ml: 1 }} container rowSpacing={2} spacing={2}>
      <Grid item md={3}>
        <ImageFormik
          folder={`users/${fuego.auth().currentUser?.uid}/socios`}
          label="Foto "
          campo={`foto`}
        />
      </Grid>
      <Grid item md={9} spacing={2} container>
        <Grid item md={12}>
          <SelectSocio
            initLabel={`${values?.apellido} ${values?.nombre}`}
            label="Socio"
            campo="idSocio"
          />
        </Grid>
        <Grid item md={6}>
          <Input label="Apellido" campo="apellido" />
        </Grid>
        <Grid item md={6}>
          <Input label="Nombre" campo="nombre" />
        </Grid>
        <Grid item md={3}>
          <Input label="Nro Socio" campo="nroSocio" />
        </Grid>
        <Grid item md={12}>
          <Typography sx={{ p: 3 }} variant="caption">
            IMPORTANTE: AL CREAR UN NUEVO REGISTRO DESDE ESTA INTERFAZ, EL
            SISTEMA AUTOMATICAMENTE MODIFICARA LA FOTO DE SU PERFIL.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
