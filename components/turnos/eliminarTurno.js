import Dialogo from "@components/forms/dialogo";
import { Button, Icon, Grid } from "@mui/material";
import { useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";

export default function EliminarTurno({ idItem, callbacksuccess }) {
  const [openConfirma, setOpenConfirma] = useState(false);
  const { deleteDocument } = useDocument(`turnos/${idItem}`, idItem);
  const eliminarTurno = async () => {
    deleteDocument()
      .then(() => {
        if (callbacksuccess) callbacksuccess();
      })
      .catch((err) => {});
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      <Button
        color="error"
        variant="outlined"
        onClick={() => setOpenConfirma(true)}
      >
        <Icon className="fas fa-trash" /> ELIMINAR TURNO
      </Button>
      <Dialogo
        callbackAcepta={() => eliminarTurno()}
        open={openConfirma}
        setOpen={setOpenConfirma}
        titulo="Eliminar Turno"
        detalle="¿Esta seguro de eliminar el turno?"
      />
    </Grid>
  );
}
