import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
import SelectSimple from "@components/forms/select2Simple";
import { IconButton, Grid } from "@mui/material";
import { useState } from "react";
import DialogForm from "./dialogForm";
import DialogFormEditar from "./dialogFormEditar";
import { getWherePermiso } from "@hooks/useUser";
export default function SelectUserModColeccion({
  multiple,
  label,
  campoId,
  campoLabel,
  coleccion,
  campo,
  addWhere,
  extraData,
  callbackchange,
  Form,
  icono,
  Modelo,
  sx,
  valoresIniciales,
  parentData,
  maxWidth,
  limit,
  esForm = true,
  allData = false,
  hideABM = false,
}) {
  const [seleccion, setSeleccion] = useState();
  const [openEditar, setOpenEditar] = useState(false);
  const [openNuevo, setOpenNuevo] = useState(false);

  const where = (allData ? [] : getWherePermiso(coleccion)).concat(
    addWhere ? addWhere : []
  );

  const { data } = useCollection(coleccion, {
    limit,
    listen: true,
    where: where,
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
        {esForm && (
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
        )}
        {!esForm && (
          <SelectSimple
            sx={sx}
            callbackchange={fn}
            extraData={extraData}
            multiple={multiple}
            campo={campo}
            label={label}
            lista={data}
            campoId={campoId}
            campoLabel={campoLabel}
          />
        )}
      </Grid>

      {seleccion && (
        <Grid item md={1}>
          {hideABM || (
            <IconButton
              size="small"
              onClick={clickEditar}
              color="secondary"
              className="fas fa-pencil"
              title={`Editar ${label}`}
            ></IconButton>
          )}
        </Grid>
      )}
      {hideABM || (
        <Grid item md={1}>
          <IconButton
            size="small"
            onClick={clickNuevo}
            color="secondary"
            className="fas fa-plus"
            title={`Agregar ${label}`}
          ></IconButton>
        </Grid>
      )}
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
