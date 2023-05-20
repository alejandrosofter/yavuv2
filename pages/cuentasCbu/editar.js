import Modelo,{valoresIniciales} from "../../modelos/ModeloCuentasCbu"
import EditarGenerico from "@components/EditarGenerico"
import Form from "./_form"

export default function Modulo({mod}) {

      return (
      <EditarGenerico valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}>
          <Form  titulo="NUEVO" subTitulo={mod.label} icono={mod.icono} />
     @components/EditarGenerico>
      )

}