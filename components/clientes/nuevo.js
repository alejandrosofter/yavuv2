import Modelo,{valoresIniciales} from "../../modelos/ModeloClientes"
import { useRouter } from "next/router"

import NuevoGenerico from "../NuevoGenerico"

import Form from "./_form"

export default function Modulo({modulo,mod,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/clientes/`
    
      return (
      <NuevoGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={Modelo}  dataUsuario={dataUsuario} >
         
            <Form token={token} titulo="NUEVO" subTitulo="Cliente" icono="fas fa-plus" />
       
      </NuevoGenerico>
      )

}