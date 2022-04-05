import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select from "../forms/select"
export default function Modulo({label,campo,callbackchange}){
    const {data}=useCollection("formaPagos",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
    if(!data) return ""
    return(
        <Select callbackchange={callbackchange} campo={campo?campo:"formaPago"} label={label?label:"Forma de Pago"} lista={data} campoId="id" 
            campoLabel="nombreFormaPago" />
    )
}