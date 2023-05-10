import EditarGenerico from "@components/EditarGenerico";
import DialogContenido from "@components/forms/dialogContenido";
import { getModUsuario } from "@helpers/db";
import Modelo, { valoresIniciales } from "../../modelos/ModeloCuentasCbu";
import Form from "./_form";
export default function EditarDialogCbu({
  open,
  setOpen,
  idItem,
  callbackSuccess,
}) {
  const mod = getModUsuario("cuentasCbu");
  return (
    <DialogContenido open={open} setOpen={setOpen}>
      <EditarGenerico
        valoresIniciales={valoresIniciales}
        mod={mod}
        modelo={Modelo}
        idItem={idItem}
        callbackSuccess={callbackSuccess}
      >
        <Form subTitulo={mod.label} icono={mod.icono} />
      </EditarGenerico>
    </DialogContenido>
  );
}
