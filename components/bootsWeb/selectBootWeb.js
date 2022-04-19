import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select2 from "../forms/select2Formik"
export default function Modulo({campo,callbackchange}){
    const {data}=useCollection("bootsWeb",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
    if(!data) return ""
    return(
        <Select2 callbackchange={callbackchange} campo={campo?campo:"bootWeb"} 
        label="Boot Web"
         lista={data} campoId="id" 
            campoLabel={(item)=>`${item.nombre}`}  />
    )
}