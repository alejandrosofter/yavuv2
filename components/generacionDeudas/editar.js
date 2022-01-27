import Modelo,{valoresIniciales} from "../../modelos/ModeloGeneracionDeuda"
import { useRouter } from "next/router"

import EditarGenerico from "../EditarGenerico"

import FormGeneracionDeudas from "./_form"

export default function Modulo({modulo,mod,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/generacionDeudas/`
    
      return (
      <EditarGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={Modelo}  dataUsuario={dataUsuario} >
         
            <FormGeneracionDeudas token={token} titulo="Editar" subTitulo="Generacion de deuda" icono="fas fa-pencil" />
       
      </EditarGenerico>
      ) 

}