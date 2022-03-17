import Modelo,{valoresIniciales} from "../../modelos/ModeloSocios"
import NuevoGenerico from "../NuevoGenerico"

import Form from "./_formSocios"

export default function Modulo({mod}) {

    
      return (
      <NuevoGenerico valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}   >
            <Form titulo="Nuevo" mod={mod} subTitulo={mod.label} icono="fas fa-plus" />
       </NuevoGenerico>
      ) 

}