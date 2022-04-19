import Modelo,{valoresIniciales} from "../../modelos/ModeloBootsWeb"
import NuevoGenerico from "../NuevoGenerico"
import Form from "./_form"

export default function Modulo({mod,callbackSuccess}) {

      return (
      <NuevoGenerico callbackSuccess={callbackSuccess} valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}>
          <Form  titulo="NUEVO" subTitulo={mod.label} icono={mod.icono} />
      </NuevoGenerico>
      )

}