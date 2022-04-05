import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select from "../forms/select"
import {getModUsuario} from "../../helpers/db"
export default function Modulo({label,campo,callbackchange}){
    const mod=getModUsuario("cuentasCbu")
    const data=mod.config?.itemsCategoriaSocios
    if(!data) return ""
    return(
        <Select callbackchange={callbackchange} campo={campo?campo:"tipoCuenta"} label={label?label:"Cuenta Asociada"} lista={data} campoId="id" 
            campoLabel="nombre" />
    )
}