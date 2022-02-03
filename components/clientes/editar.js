import Modelo,{valoresIniciales} from "../../modelos/ModeloClientes"
import { useRouter } from "next/router"

import EditarGenerico from "../EditarGenerico"

import Form from "./_form"

export default function Modulo({modulo,mod,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/clientes/`
    
      return (
      <EditarGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={Modelo}  dataUsuario={dataUsuario} >
         
            <Form token={token} titulo="Editar" subTitulo="Cliente" icono="fas fa-pencil" />
       
      </EditarGenerico>
      ) 

}