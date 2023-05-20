import Modelo, { valoresIniciales } from "../../modelos/ModeloModulos"
import { useRouter } from "next/router"
import NuevoGenerico from "@components/NuevoGenerico"
import Form from "./_form2"

export default function Modulo({mod}) {

      return (
      <NuevoGenerico valoresIniciales={valoresIniciales} mod={mod} 
      modelo={Modelo}   >
         
            <Form  titulo="NUEVA" subTitulo="Actividad" icono="fas fa-plus" />
       
     @components/NuevoGenerico>
      )

}