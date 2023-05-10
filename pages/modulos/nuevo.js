import Modelo, { valoresIniciales } from "../../modelos/ModeloModulos"
import { useRouter } from "next/router"
import NuevoGenerico from "../NuevoGenerico"
import Form from "./_form"

export default function Modulo({mod}) {

      return (
      <NuevoGenerico valoresIniciales={valoresIniciales} mod={mod} 
      modelo={Modelo}   >
         
            <Form  titulo="NUEVA" subTitulo="Actividad" icono="fas fa-plus" />
       
      </NuevoGenerico>
      )

}