import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
import { IconButton, Grid } from "@mui/material";
import { useState } from "react";
import DialogForm from "./dialogForm";
import DialogFormEditar from "./dialogFormEditar";
export default function SelectUserModColeccion({
  multiple,
  label,
  campoId,
  campoLabel,
  coleccion,
  campo,
  extraData,
  callbackchange,
  Form,
  icono,
  Modelo,
  valoresIniciales,
  parentData,
  maxWidth,
  limit,
}) {
  const [seleccion, setSeleccion] = useState();
  const [openEditar, setOpenEditar] = useState(false);
  const [openNuevo, setOpenNuevo] = useState(false);

  const { data } = useCollection(coleccion, {
    limit,
    where: parentData
      ? ["idUsuario", "==", localStorage.getItem("usermod")]
      : ["usermod", "==", fuego.auth().currentUser?.uid],
  });
  const clickEditar = () => {
    setOpenEditar(true);
  };
  const clickNuevo = () => {
    setOpenNuevo(true);
  };
  const fn = (valor, item) => {
    setSeleccion(item);
    if (callbackchange) callbackchange(valor, item);
  };
  const callbackSuccess = (valor, item) => {
    setOpenNuevo(false);
    setOpenEditar(false);
  };

  if (!data) return "";
  return (
    <Grid container spacing={2}>
      <Grid item md={10}>
        <Select2
          callbackchange={fn}
          extraData={extraData}
          multiple={multiple}
          campo={campo}
          label={label}
          lista={data}
          campoId={campoId}
          campoLabel={campoLabel}
        />
      </Grid>
      {seleccion && (
        <Grid item md={1}>
          <IconButton
            size="small"
            onClick={clickEditar}
            color="secondary"
            className="fas fa-pencil"
            title={`Editar ${label}`}
          ></IconButton>
        </Grid>
      )}
      <Grid item md={1}>
        <IconButton
          size="small"
          onClick={clickNuevo}
          color="secondary"
          className="fas fa-plus"
          title={`Agregar ${label}`}
        ></IconButton>
      </Grid>
      <DialogForm
        open={openNuevo}
        setOpen={setOpenNuevo}
        Form={Form}
        maxWidth={maxWidth}
        icono={icono}
        Modelo={Modelo}
        coleccion={coleccion}
        callbackSuccess={callbackSuccess}
        valoresIniciales={valoresIniciales}
        label={`Agregar ${label}`}
      />
      <DialogFormEditar
        open={openEditar}
        setOpen={setOpenEditar}
        Form={Form}
        maxWidth={maxWidth}
        icono={icono}
        Modelo={Modelo}
        editar={true}
        coleccion={coleccion}
        dataForm={seleccion}
        valoresIniciales={valoresIniciales}
        callbackSuccess={callbackSuccess}
        label={`Editar ${label}`}
      />
    </Grid>
  );
}
