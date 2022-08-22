import NuevoGenerico from "@components/NuevoGenerico2";
import DialogContenido from "@components/forms/dialogContenido";

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
  valoresIniciales,
  callbackSuccess,
}) {
  return (
    <DialogContenido maxWidth={maxWidth} open={open} setOpen={setOpen}>
      <NuevoGenerico
        coleccion={coleccion}
        valoresIniciales={valoresIniciales}
        icono={icono}
        titulo={label}
        modelo={Modelo}
        idItem={idItem}
        callbackSuccess={callbackSuccess}
      >
        <Form subTitulo={label} icono={icono} />
      </NuevoGenerico>
    </DialogContenido>
  );
}
