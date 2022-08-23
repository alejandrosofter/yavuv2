import DialogContenido from "@components/forms/dialogContenido";
import { getModUsuario } from "@helpers/db";
import EditarGenerico from "@components/EditarGenerico2";
export default function DialogForm({
  open,
  setOpen,
  idItem,
  icono,
  label,
  coleccion,
  Form,
  Modelo,
  maxWidth,
  campoId = "id",
  valoresIniciales,
  callbackSuccess,
  dataForm,
}) {
  if (!dataForm) return "";
  console.log(`${coleccion}/${dataForm[campoId]}`);
  return (
    <DialogContenido maxWidth={maxWidth} open={open} setOpen={setOpen}>
      <EditarGenerico
        coleccion={`${coleccion}/${dataForm[campoId]}`}
        valoresIniciales={valoresIniciales}
        icono={icono}
        titulo={label}
        modelo={Modelo}
        idItem={idItem}
        callbackSuccess={callbackSuccess}
        dataForm={dataForm}
      >
        <Form subTitulo={label} icono={icono} />
      </EditarGenerico>
    </DialogContenido>
  );
}