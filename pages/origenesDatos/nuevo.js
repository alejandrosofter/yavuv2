import EditarGenerico from "@components/EditarGenerico";
import ModeloOrigenesDatos, {
  valoresIniciales,
} from "../../modelos/ModeloOrigenesDatos";
import _FormGenerico from "../_formGenerico";
import { Field } from "formik";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material";
import { useState } from "react";
import Input from "@components/forms/input";
import { Select } from "formik-mui";
import MultiSelect from "../forms/multiSelect";
import { useRouter } from "next/router";
import useSWR from "swr";
import SwitchFormik from "@components/forms/switch";
import NuevoGenerico from "@components/NuevoGenerico";

export default function Modulo({ modulo, token, dataUsuario }) {
  const router = useRouter();
  const urlAcepta = `/api/origenesDatos/${router.query.idItem}`;
  const urlModulos = `/api/modulos/`;

  const { data: dataModulos, mutate, isValidating } = useSWR(urlModulos);
  if (!dataModulos) return <CircularProgress />;
  return (
    <NuevoGenerico
      token={token}
      urlAcepta={urlAcepta}
      valoresIniciales={valoresIniciales}
      modulo={modulo}
      modelo={ModeloOrigenesDatos}
      esNuevo={true}
      dataUsuario={dataUsuario}
    >
      <Grid sx={{ pt: 3 }} md={12} container rowSpacing={2} spacing={2}>
        <Grid item md={5}>
          <Input label="Nombre " campo="nombre" />
        </Grid>
        <Grid item md={3}>
          <Input label="Host " campo="host" />
        </Grid>
        <Grid item md={3}>
          <Input label="Puerto " campo="port" />
        </Grid>
        <Grid item md={4}>
          <Input label="Usuario " campo="user" />
        </Grid>
        <Grid item md={4}>
          <Input label="Clave " campo="pass" />
        </Grid>
        <Grid item md={4}>
          <Input label="Db " campo="db" />
        </Grid>
        <Grid item md={3}>
          <SwitchFormik label="Es MongoDB? " campo="esMongo" />
        </Grid>
        <Grid item md={3}>
          <Input label="Es Defecto? " campo="esDefecto" />
        </Grid>
      </Grid>
   @components/NuevoGenerico>
  );
}
Modulo.auth = true;
