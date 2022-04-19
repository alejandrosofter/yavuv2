import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select2 from "../forms/select2Formik"
export default function Modulo({label,campo,callbackchange}){
    const {data}=useCollection("obrasSociales",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
    if(!data) return ""
    return(
        <Select2 callbackchange={callbackchange} campo={campo?campo:"obraSocial"} label={label?label:"Obra Social"}
         lista={data} campoId="id" 
            campoLabel="nombre" />
    )
}