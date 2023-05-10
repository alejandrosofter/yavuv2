import { CircularProgress, Grid, Stack, Tab, Typography } from "@mui/material";

import Input from "@components/forms/input";

import { useCollection, fuego } from "@nandorojo/swr-firestore";
import ImageFormik from "@components/forms/imageFormik";

export function FormDataCuenta({}) {
  const { data: dataPlanes } = useCollection("planes");
  const URL_CUENTAS = `users/${fuego.auth().currentUser?.uid}/cuentas`;
  return (
    <Grid sx={{ pt: 3 }} md={12} container rowSpacing={2} spacing={2}>
      <Grid item md={1}>
        <ImageFormik folder={URL_CUENTAS} label="Logo" campo={`logo`} />
      </Grid>
      <Grid item xs container sx={{ ml: 1 }} md={9} spacing={2}>
        <Grid item md={6}>
          <Input label="Razon Social " campo="razonSocial" />
        </Grid>
        <Grid item md={4}>
          <Input label="Email " campo="email" />
        </Grid>
        <Grid item md={4}>
          <Input label="Email Info" campo="emailInfo" />
        </Grid>
        <Grid item md={7}>
          <Input label="Direccion" campo="direccion" />
        </Grid>
        <Grid item md={6}>
          <Input label="Horarios " campo="horarios" />
        </Grid>
        {/* <Grid item md={8}>
        <SelectFormik
          label="Plan"
          campoId={"id"}
          campoLabel={"nombre"}
          lista={dataPlanes}
          campo="plan"
        />
      </Grid> */}

        <Grid item md={4}>
          <Input label="Telefono " campo="telefono" />
        </Grid>
      </Grid>
    </Grid>
  );
}
