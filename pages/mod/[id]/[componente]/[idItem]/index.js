import Controlador from "../../../../../components/Controlador";
import {useRouter} from "next/router"
import {getModuloMod} from "../../../../../helpers/mods";
  export default function Modulo({auth}){
    const router =useRouter()
    const mod=getModuloMod({auth,id:router.query.id})

    if(!mod )return "Cargando Mod..."
          return(
              <Controlador 
              mod={mod} url={`${mod.nombre}/${router.query.componente}`}/>
          )
  
  }
  