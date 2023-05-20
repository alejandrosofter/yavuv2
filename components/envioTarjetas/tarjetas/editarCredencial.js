import EditarGenerico from "@components/EditarGenerico";
import DialogContenido from "@components/forms/dialogContenido";
import {
  ModeloCredenciales,
  valoresInicialesCredenciales,
} from "@modelos/ModeloEnvioTarjetas";
import Form from "./_formTarjeta";
export default function Editar({ data, open, setOpen, idEnvio }) {
  if (!data) return "No hay data";
  const mod = { label: "Editar Credencial", icon: "fas fa-credit-card" };
  const callbackSuccess = () => {
    setOpen(false);
  };
  return (
    <DialogContenido titulo={`EDITAR CREDENCIAL`} open={open} setOpen={setOpen}>
      <EditarGenerico
        pathDocExterno={`/envioTarjetas/${idEnvio}/tarjetas/${data.idTarjeta}`}
        callbackSuccess={callbackSuccess}
        valoresIniciales={valoresInicialesCredenciales}
        mod={mod}
        modelo={ModeloCredenciales}
      >
        <Form subTitulo={"Editar"} icono={mod.icono} />
      </EditarGenerico>
    </DialogContenido>
  );
}
