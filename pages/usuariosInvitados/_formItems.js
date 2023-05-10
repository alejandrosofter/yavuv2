import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import Select from "../forms/select";
import SwitchFormik from "../forms/switch";

import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import SelectFormik from "@components/forms/select2Formik";
import { getModUsuario } from "@helpers/db";
export default function _FormItemsUsuarios({ values, setFieldValue }) {
  const [modSeleccion, setModSeleccion] = useState();
  const { data: mods } = useCollection("mods", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  const { data: recursos } = useCollection(modSeleccion?.coleccion, {
    where: [["idUsuario", "==", fuego.auth().currentUser.uid]],
  });
  if (!mods) return "Cargando mods..";

  const cambiaMod = (valor, item) => {
    setFieldValue("icono", item.icono);
    setModSeleccion(item);
  };

  return (
    <Grid spacing={2} container>
      <Grid item md={12}>
        <SelectFormik
          label="Modulo "
          callbackchange={cambiaMod}
          lista={mods}
          campoLabel="label"
          campoId="id"
          campo="idMod"
        />
      </Grid>
      <Grid item md={3}>
        <SwitchFormik label="Habilitado " campo="habilitado" />
      </Grid>
      <Grid item md={2}>
        <SwitchFormik campo="accesoTotal" label="Acceso Total" />
      </Grid>
      {recursos && (
        <Grid item md={6}>
          <SelectFormik
            multiple={true}
            lista={recursos}
            campoId="id"
            campoLabel={modSeleccion.labelField}
            campo="recursos"
            label="Recursos"
          />
        </Grid>
      )}
    </Grid>
  );
}
