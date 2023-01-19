import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Form from "./_form";
import {
  ModeloMovimiento,
  valoresInicialesMovimiento,
} from "@modelos/ModeloGeneracionDeuda";
export default function NuevoMovimientoGeneracionDeuda({
  open,
  seleccion,
  setOpen,
  grupo,
  actividad,
  callbackSuccess,
  tipoOperacion = "SELECCION",
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
        modelo={ModeloMovimiento}
        preData={{ items: seleccion, tipoOperacion }}
        dataForm={{ grupo, actividad }}
        icono={"fas fa-plus"}
        coleccion={`generacionDeuda_movimientos`}
        label={"Nuevo Movimiento"}
      >
        <Form titulo="Nuevo" />
      </NuevoGenerico>
    </DialogContenido>
  );
}
