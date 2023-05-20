import Modelo, { valoresIniciales } from "@modelos/ModeloMods";
import EditarGenerico from "@components/EditarGenerico";

import Form from "@components/modulos/_form2";
import { useRouter } from "next/router";
import { Button, Icon, Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import ConfirmDialog from "@components/forms/confirmDialog";
import { useState } from "react";
export default function Modulo({ mod }) {
  const router = useRouter();
  const [openConfirmar, setOpenConfirmar] = useState(false);
  const quitarMod = () => {
    fuego.db
      .collection("mods")
      .doc(mod.id)
      .delete()
      .then(() => {
        router.back();
      });
  };
  return (
    <Grid container>
      <Grid item md={10}></Grid>
      <Grid item md={2}>
        <Button variant="contained" color="error" onClick={quitarMod}>
          <Icon className={"fas fa-trash"} /> Eliminar Mod
        </Button>
      </Grid>
      <Grid item md={12}>
        <EditarGenerico
          pathDocExterno={`mods/${router.query.id}`}
          mod={mod}
          modelo={Modelo}
        >
          <Form mod={mod} />
        </EditarGenerico>
      </Grid>
      <ConfirmDialog
        open={openConfirmar}
        setOpen={setOpenConfirmar}
        callbacksuccess={() => quitarMod()}
      />
    </Grid>
  );
}
