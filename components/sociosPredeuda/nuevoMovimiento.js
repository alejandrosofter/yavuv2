import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Form from "./_formMovimiento";
import {
  ModeloMovimientos,
  valoresInicialesMovimiento,
} from "@modelos/ModeloPredeudaSocios";
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
        valoresIniciales={valoresInicialesMovimiento}
        modelo={ModeloMovimientos}
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
