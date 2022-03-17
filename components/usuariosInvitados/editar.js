import Modelo,{valoresIniciales} from "../../modelos/ModeloUsuariosInvitados"
import EditarGenerico from "../EditarGenerico"
import Form from "./_form"

export default function Modulo({mod}) {

      return (
      <EditarGenerico valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}>
          <Form subTitulo={mod.label} icono={mod.icono} />
      </EditarGenerico>
      )

}