import DialogContenido from "@components/forms/dialogContenido";
import EditarGenerico from "@components/EditarGenerico2";

export function ABMCollection_editar({
  open,
  setOpen,
  Form,
  callbackSuccess,
  valoresIniciales,
  Modelo,
  coleccion,
  icono,
  label,
  maxWidth,
  subTitulo,
  dataForm,
  doc,
}) {
  const cb = (data) => {
    setOpen(false);
    if (callbackSuccess) callbackSuccess(data);
  };
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth={maxWidth ? maxWidth : "sm"}
      open={open}
      setOpen={setOpen}
    >
      <EditarGenerico
        callbackSuccess={cb}
        valoresIniciales={valoresIniciales}
        icono={icono}
        coleccion={`${coleccion}/${doc.id}`}
        label={label}
        modelo={Modelo}
        dataForm={dataForm}
      >
        <Form subTitulo={subTitulo} icono={icono} />
      </EditarGenerico>
    </DialogContenido>
  );
}
