import Modelo,{valoresIniciales} from "../../modelos/ModeloSocios"
import EditarGenerico from "../EditarGenerico"

import Form from "./_formSocios"

export default function Modulo({mod}) {

    
      return (
      <EditarGenerico valoresIniciales={valoresIniciales}  mod={mod} modelo={Modelo}   >
            <Form titulo="Editar" mod={mod} subTitulo={mod.label} icono="fas fa-pencil" />
       </EditarGenerico>
      ) 

}