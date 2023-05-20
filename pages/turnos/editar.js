import Modelo, { valoresIniciales } from "../../modelos/ModeloTurnos";
import EditarGenerico from "@components/EditarGenerico";
import Form from "./_form";

export default function Modulo({ mod, callbackSuccess, idItem, icono, label }) {
  const callbackElimina = (res) => {
    if (callbackSuccess) callbackSuccess();
  };
  return (
    <EditarGenerico
      idItem={idItem}
      coleccion={"turnos"}
      label="Editar Turno"
      icono="fas fa-calendar"
      callbackSuccess={callbackSuccess}
      valoresIniciales={valoresIniciales}
      modelo={Modelo}
    >
      <Form subTitulo={label} callbackElimina={callbackElimina} icono={icono} />
    </EditarGenerico>
  );
}
