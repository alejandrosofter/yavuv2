import {
  valoresInicialesRespuestas,
  ModeloRespuestasBanco,
} from "@modelos/ModeloDebitoAutomatico";
import NuevoGenerico from "@components/NuevoGenerico2";
import Form from "./_form";
import DialogContenido from "@components/forms/dialogContenido";

export default function NuevaRespuestaBanco({
  idDebito,
  callbackSuccess,
  open,
  setOpen,
}) {
  const label = "Respuestas Banco";
  const icono = "fas fa-pink-heart";
  return (
    <DialogContenido titulo={label} open={open} setOpen={setOpen}>
      <NuevoGenerico
        callbackSuccess={callbackSuccess}
        preData={{ idDebito }}
        valoresIniciales={valoresInicialesRespuestas}
        icono={icono}
        coleccion={`debitoAutomatico/${idDebito}/respuestasBanco`}
        label={label}
        modelo={ModeloRespuestasBanco}
      >
        <Form titulo="NUEVO" subTitulo={label} icono={icono} />
      </NuevoGenerico>
    </DialogContenido>
  );
}
