import Modelo,{valoresIniciales} from "../../modelos/ModeloModulos"
import { useRouter } from "next/router"

import EditarGenerico from "../EditarGenerico"

import Form from "./_form"

export default function Modulo({mod}) {

    
      return (
      <EditarGenerico mod={mod}  modelo={Modelo}   >
         
            <Form titulo="Editar" subTitulo="Modulo" icono="fas fa-pencil" />
       
      </EditarGenerico>
      ) 

}