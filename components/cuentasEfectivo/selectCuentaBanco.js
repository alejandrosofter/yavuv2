import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select from "../forms/select"
export default function Modulo({label,campo,callbackchange}){
    const {data}=useCollection("cuentasEfectivo",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
    if(!data) return ""
    return(
        <Select callbackchange={callbackchange} campo={campo?campo:"idCuentaBanco"} label={label?label:"Cuenta Asociada"} lista={data} campoId="id" 
            campoLabel="nombre" />
    )
}