import DialogContenido from "@components/forms/dialogContenido";
import Modelo, { valoresIniciales } from "@modelos/ModeloCompras";
import EditarGenerico from "@components/EditarGenerico2";
import Form from "./_form";
export default function EditarComprasModal({ open, setOpen, doc }) {
  const callbackSuccess = (data) => {
    setOpen(false);
  };
  if (!doc) return "";
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <EditarGenerico
        callbackSuccess={callbackSuccess}
        valoresIniciales={valoresIniciales}
        icono={"fas fa-users"}
        coleccion={`compras/${doc?.id}`}
        label={"Compra"}
        modelo={Modelo}
      >
        <Form icono={"fas fa-pencil"} />
      </EditarGenerico>
    </DialogContenido>
  );
}
