import Modelo,{valoresIniciales} from "../../modelos/ModeloBootsWeb"
import EditarGenerico from "../EditarGenerico"
import Form from "./_form"

export default function Modulo({mod,callbackSuccess}) {

      return (
      <EditarGenerico callbackSuccess={callbackSuccess} valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}>
          <Form   subTitulo={mod.label} icono={mod.icono} />
      </EditarGenerico>
      )

}