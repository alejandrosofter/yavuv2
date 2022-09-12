import DialogContenido from "@components/forms/dialogContenido";
import Modelo, { valoresIniciales } from "@modelos/ModeloEstadisticas";
import EditarGenerico from "../EditarGenerico2";
import Form from "./_form";

export default function EditarEstadistica({
  dataForm,
  callbackSuccess,
  open,
  setOpen,
  doc,
}) {
  const label = "Estadisticas";
  const icono = "fas fa-chart-line";
  const coleccion = "estadisticas";
  const subTitulo = "para graficos";
  const cb = (data) => {
    setOpen(false);
    if (callbackSuccess) callbackSuccess(data);
  };
  if (!doc) return null;
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth={"lg"}
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
