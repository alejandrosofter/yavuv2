import Modelo,{valoresIniciales} from "../../modelos/ModeloProductos"
import NuevoGenerico from "../NuevoGenerico"
import Form from "./_form"

export default function Modulo({mod}) {

      return (
      <NuevoGenerico valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}>
          <Form subTitulo={mod.label} icono={mod.icono} />
      </NuevoGenerico>
      )

}