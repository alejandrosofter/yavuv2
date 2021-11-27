import NuevaCuenta from "./nuevo"
import EditarCuenta from "./editar"
import useSWR from "swr"
import Loader from "../loader"
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ModuloCuenta({modulo,dataUsuario,auth,dataCuenta}) {
     
      const dataInicial=()=>({idUsuario:auth.id,nombre:auth.displayName,email:auth.email,telefono:auth.phoneNumber})
      
      return (
            <div>
                  {dataCuenta.nombre && <EditarCuenta auth={auth} dataCuenta={dataCuenta} modulo={modulo} dataUsuario={dataUsuario} idUsuario={auth.id} /> }
                  {!dataCuenta.nombre &&  <NuevaCuenta valoresIniciales={dataInicial} 
                  idUsuario={auth.id} dataUsuario={dataUsuario} modulo={modulo} />
                  }
            </div>
      )

}