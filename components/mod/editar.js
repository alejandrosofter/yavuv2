import Modelo,{valoresIniciales} from "../../modelos/ModeloMods"
import EditarGenerico from "../EditarGenerico"

import Form from "../modulos/_form"
import { useRouter } from "next/router";
export default function Modulo({mod}) {
    const router=useRouter()
      return (
      <EditarGenerico pathDocExterno={`mods/${router.query.id}`} mod={mod} modelo={Modelo}   >
            <Form mod={mod} />
       </EditarGenerico>
      ) 

}