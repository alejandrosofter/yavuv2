import Modelo, {
  valoresIniciales,
} from "@modelos/ModeloComprobantesElectronicos";
import NuevoGenerico from "@components/NuevoGenerico";
import Form from "./_form";

export default function Modulo({ mod }) {
  return (
    <NuevoGenerico
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form
        esNuevo={true}
        titulo="NUEVO"
        subTitulo={mod.label}
        icono={mod.icono}
      />
    </NuevoGenerico>
  );
}
