import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";

export function ABMCollection_nuevo({
  open,
  setOpen,
  Form,
  callbackSuccess,
  valoresIniciales,
  Modelo,
  coleccion,
  icono,
  preData,
  label,
  maxWidth,
  subTitulo,
  dataForm,
}) {
  const cb = (data, id) => {
    setOpen(false);
    if (callbackSuccess) callbackSuccess(data, id);
  };
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth={maxWidth ? maxWidth : "sm"}
      open={open}
      setOpen={setOpen}
    >
      <NuevoGenerico
        callbackSuccess={cb}
        valoresIniciales={valoresIniciales}
        icono={icono}
        coleccion={coleccion}
        label={label}
        preData={preData}
        modelo={Modelo}
        dataForm={dataForm}
      >
        <Form subTitulo={subTitulo} icono={icono} />
      </NuevoGenerico>
    </DialogContenido>
  );
}
