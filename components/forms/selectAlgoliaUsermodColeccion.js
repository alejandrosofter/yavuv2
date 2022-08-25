import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
import { IconButton, Grid } from "@mui/material";
import { useState } from "react";
import DialogForm from "./dialogForm";
import DialogFormEditar from "./dialogFormEditar";
import SelectFormikAlgolia from "./selectAlgoliaFormik";
export default function SelectAlgoliaUserModColeccion({
  label,
  coleccionAlgolia,
  campo,
  callbackchange,
  values,
  Form,
  icono,
  Modelo,
  valoresIniciales,
  parentData,
  labelItems,
  coleccion,
  maxWidth,
}) {
  const campoId = "objectID";
  const [seleccion, setSeleccion] = useState({ [campoId]: values[campo] });
  const [openEditar, setOpenEditar] = useState(false);
  const [openNuevo, setOpenNuevo] = useState(false);

  const clickEditar = () => {
    setOpenEditar(true);
  };
  const clickNuevo = () => {
    setOpenNuevo(true);
  };
  const fn = (item, res) => {
    setSeleccion(item);
    if (callbackchange) callbackchange(item, res);
  };
  const callbackSuccess = (valor, item) => {
    setOpenNuevo(false);
    setOpenEditar(false);
  };

  //   (opt) =>
  //               `${opt.titular} - ${opt.cbu} - ${
  //                 opt.dniTitular ? opt.dniTitular : ""
  //               }`
  //campo"idCuentaCbu"

  return (
    <Grid container spacing={2}>
      <Grid item md={10}>
        <SelectFormikAlgolia
          coleccionAlgolia={coleccionAlgolia}
          label={label}
          labelItems={labelItems}
          campo={campo}
          callbackchange={fn}
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
          color="secondary"
          onClick={clickNuevo}
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
        campoId={campoId}
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
