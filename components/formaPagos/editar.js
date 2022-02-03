import Modelo,{valoresIniciales} from "../../modelos/ModeloFormaPago"
import { useRouter } from "next/router"

import EditarGenerico from "../EditarGenerico"

import Form from "./_form"

export default function Modulo({modulo,mod,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/formaPagos/`
    
      return (
      <EditarGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={Modelo}  dataUsuario={dataUsuario} >
         
            <Form token={token} titulo="Editar" subTitulo="Forma Pago" icono="fas fa-pencil" />
       
      </EditarGenerico>
      ) 

}