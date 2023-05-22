import Grid from "@mui/material/Grid";

import SwitchFormik from "@components/forms/switch";

import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useContext, useEffect, useState } from "react";
import SelectFormik from "@components/forms/select2Formik";
import { Context } from "context/userContext";
export default function _FormItemsUsuarios({ values, setFieldValue }) {
  const [modSeleccion, setModSeleccion] = useState();
  const contextoUsuario = useContext(Context);
  // const { data: mods_ } = useCollection("mods", {
  //   where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  // });
  const mods = contextoUsuario?.plan?.dataModulos
    .map((item) => {
      return item.items;
    })
    .reduce((a, b) => a.concat(b), []);

  const cambiaMod = (valor, item) => {
    setFieldValue("nombreModulo", item.nombre);
    setFieldValue("icono", item.icono);
    // setModSeleccion(item);
  };

  return (
    <Grid spacing={2} container>
      <Grid item md={10}>
        <SelectFormik
          label="Modulo "
          callbackchange={cambiaMod}
          lista={mods}
          campoLabel="label"
          campoId="id"
          campo="idModulo"
        />
      </Grid>
      <Grid item md={2}>
        {values.label_idMod}
      </Grid>
      <Grid item md={3}>
        <SwitchFormik label="Habilitado " campo="habilitado" />
      </Grid>
      <Grid item md={2}>
        <SwitchFormik campo="accesoTotal" label="Acceso Total" />
      </Grid>
    </Grid>
  );
}
