import Modelo,{valoresIniciales} from "../../modelos/ModeloFormaPago"
import NuevoGenerico from "../NuevoGenerico"

import Form from "./_form"

export default function Modulo({mod}) {

    
      return (
      <NuevoGenerico valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}   >
            <Form titulo="Nuevo" subTitulo={mod.label} icono="fas fa-pencil" />
       </NuevoGenerico>
      ) 

}