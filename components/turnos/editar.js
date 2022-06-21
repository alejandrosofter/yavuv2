import Modelo, { valoresIniciales } from "../../modelos/ModeloTurnos";
import EditarGenerico from "../EditarGenerico";
import Form from "./_form";

export default function Modulo({ mod, callbackSuccess, idItem }) {
  const callbackElimina = (res) => {
    console.log(res);
    if (callbackSuccess) callbackSuccess();
  };
  return (
    <EditarGenerico
      idItem={idItem}
      callbackSuccess={callbackSuccess}
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form
        subTitulo={mod.label}
        callbackElimina={callbackElimina}
        icono={mod.icono}
      />
    </EditarGenerico>
  );
}
