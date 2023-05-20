import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Form from "./_formMovimiento";
import Modelo, { valoresIniciales } from "@modelos/ModeloPredeudaSocios";
export default function NuevoMovimientoPredeuda({
  open,
  seleccion,
  setOpen,
  callbackSuccess,
  tipoOperacion,
}) {
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <NuevoGenerico
        callbackSuccess={callbackSuccess}
        valoresIniciales={valoresIniciales}
        modelo={Modelo}
        preData={{ items: seleccion, tipoOperacion }}
        dataForm={{ seleccion }}
        icono={"fas fa-plus"}
        coleccion={`socios_predeudas_movimientos`}
        label={"Nuevo Movimiento"}
      >
        <Form titulo="Nuevo" />
      </NuevoGenerico>
    </DialogContenido>
  );
}
