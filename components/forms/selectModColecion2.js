import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik2";
import SelectSimple from "@components/forms/select2Simple";
import { IconButton, Grid } from "@mui/material";
import { useState } from "react";
import DialogForm from "./dialogForm";
import DialogFormEditar from "./dialogFormEditar";
import { getWherePermiso } from "@hooks/useUser";
import DialogContenido from "./dialogContenido";
import Dialogo from "./dialogo";
export default function SelectUserModColeccion2({
  multiple,
  label,
  campoId,
  campoLabel,
  coleccion,
  campo,
  addWhere,
  extraData,
  callbackchange,
  callbackSuccessNew,
  Form,
  icono,
  Modelo,
  sx,
  valoresIniciales,
  listen = true,
  maxWidth,
  limit,
  defaultValue,
  esForm = true,
  allData = false,
  hideABM = false,
}) {
  const [seleccion, setSeleccion] = useState();
  const [openEditar, setOpenEditar] = useState(false);
  const [openNuevo, setOpenNuevo] = useState(false);
  const [openQuitar, setOpenQuitar] = useState(false);

  const where = (allData ? [] : getWherePermiso(coleccion)).concat(
    addWhere ? addWhere : []
  );

  const { data } = useCollection(coleccion, {
    limit,
    listen,
    where: where,
  });
  const clickEditar = () => {
    setOpenEditar(true);
  };
  const clickNuevo = () => {
    setOpenNuevo(true);
  };
  const clickQuitar = (item) => {
    setSeleccion(item);
    setOpenQuitar(true);
  };
  const fnQuitar = () => {
    setOpenQuitar(false);
    fuego.db.collection(coleccion).doc(seleccion.id).delete();
    setSeleccion(null);
  };
  const fn = (valor, item) => {
    setSeleccion(item);
    if (callbackchange) callbackchange(valor, item);
  };
  const callbackSuccess = (valor, item) => {
    setOpenNuevo(false);
    setOpenEditar(false);
    if (callbackSuccessNew) callbackSuccessNew(valor, item);
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
            defaultValue={defaultValue}
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
            <>
              <IconButton
                size="small"
                onClick={clickEditar}
                color="secondary"
                className="fas fa-pencil"
                title={`Editar ${label}`}
              ></IconButton>
              <IconButton
                size="small"
                onClick={clickQuitar.bind(this, seleccion)}
                color="error"
                className="fas fa-trash"
                title={`Quitar ${label}`}
              ></IconButton>
            </>
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
      <Dialogo
        callbackAcepta={fnQuitar}
        open={openQuitar}
        setOpen={setOpenQuitar}
        detalle={
          "Estas seguro/a de quitar este elemento? los cambios son permanentes"
        }
        titulo={`Quitar`}
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
