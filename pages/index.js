import { useCollection } from "@nandorojo/swr-firestore";
import Controlador from "../components/Controlador";
import getModModulo from "../helpers/mods"
export default function Modulo({auth}){
const mod=getModModulo({auth,esInicial:true})
    if(!mod)return "Cargando mod.."
        return(
            <Controlador url={`${mod.nombre}`} mod={mod} />
        )

}
