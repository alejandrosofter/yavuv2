import Modelo,{valoresIniciales} from "../../modelos/ModeloGeneracionDeuda"
import { useRouter } from "next/router"

import EditarGenerico from "@components/EditarGenerico"

import FormGeneracionDeudas from "./_form"

export default function Modulo({mod}) {
    const router=useRouter();
    const urlAcepta=`/api/generacionDeudas/`
    
      return (
      <EditarGenerico  valoresIniciales={valoresIniciales} mod={mod} 
      modelo={Modelo}  >
         
            <FormGeneracionDeudas titulo="Editar" subTitulo="Generacion de deuda" icono="fas fa-pencil" />
       
     @components/EditarGenerico>
      ) 

}