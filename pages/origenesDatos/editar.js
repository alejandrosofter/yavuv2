import EditarGenerico from "../EditarGenerico";
import ModeloOrigenesDatos from "../../modelos/ModeloOrigenesDatos";

import { Grid } from "@mui/material";
import Input from "@components/forms/input";
import { useRouter } from "next/router";
import SwitchFormik from "../forms/switch";

export default function Modulo({ modulo, token, dataUsuario }) {
  const router = useRouter();
  const urlAcepta = `/api/origenesDatos/${router.query.idItem}`;

  return (
    <EditarGenerico
      token={token}
      urlAcepta={urlAcepta}
      modulo={modulo}
      modelo={ModeloOrigenesDatos}
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
          <SwitchFormik label="Es Defecto? " campo="esDefecto" />
        </Grid>
      </Grid>
    </EditarGenerico>
  );
}
Modulo.auth = true;
