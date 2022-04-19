import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select2 from "../forms/select2Formik"
export default function Modulo({label,campo,callbackchange,idObraSocial}){
    const {data}=useCollection("prestaciones",{where:[
        ["idUsuario","==",fuego.auth().currentUser.uid],
        ["obraSocial","==",idObraSocial]
    ]})
    if(!data) return ""
    return(
        <Select2 callbackchange={callbackchange} campo={campo?campo:"prestacion"} label={label?label:"Prestacion"}
         lista={data} campoId="id" 
            campoLabel={item=>`${item.codigo} - ${item.nombre}`} />
    )
}