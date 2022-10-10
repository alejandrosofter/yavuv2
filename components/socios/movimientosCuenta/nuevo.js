import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import {
  valoresInicialesMovimiento,
  ModeloMovimientoCuenta,
} from "@modelos/ModeloSocios";

import Form from "./_formMovimientoCuenta";

export default function NuevaDeuda({ open, setOpen, idSocio }) {
  const callbackSuccess = (data) => {
    console.log(data);
    setOpen(false);
  };
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
        icono={"fas fa-users"}
        coleccion={`socios/${idSocio}/movimientosCuenta`}
        label={"Nueva Deuda"}
        modelo={ModeloMovimientoCuenta}
      >
        <Form subTitulo={"DEuda"} icono={"fas fa-plus"} />
      </NuevoGenerico>
    </DialogContenido>
  );
}
