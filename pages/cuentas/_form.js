import { Grid, Stack } from "@mui/material";

import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectPlan from "@pages/planes/selectPlanes";
export default function Form({ mod, setFieldValue, values }) {
  const { data: centrosCosto } = useCollection("centroCostos", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });

  return (
    <Grid sx={{ p: 2 }} container spacing={2}>
      <Grid item md={3}>
        <Input label="Email" campo="email" />
      </Grid>
      <Grid item md={3}>
        <Switch label="Administrador General" campo="esSuperAdmin" />
      </Grid>
      <Grid item md={3}>
        <Switch label="Cuenta Principal" campo="esCuentaPrincipal" />
      </Grid>
      <Grid item md={2}>
        <Input label="Nombre" campo="nombre" />
      </Grid>

      <Grid item md={3}>
        <Input label="Razon Social" campo="razonSocial" />
      </Grid>
      <Grid item md={3}>
        <Input label="ID user FIRESTORE" campo="idUsuarioFirestore" />
      </Grid>
      <Grid item md={2}>
        <Input label="Tel" campo="telefono" />
      </Grid>

      <Grid item md={3}>
        <SelectPlan />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
    </Grid>
  );
}
