import Modelo,{valoresIniciales} from "../../modelos/ModeloProfesores"
import EditarGenerico from "../EditarGenerico"
import Form from "./_form"

export default function Modulo({mod}) {

      return (
      <EditarGenerico valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}>
          <Form  titulo="EDITAR" subTitulo={mod.label} icono={mod.icono} />
      </EditarGenerico>
      )

}