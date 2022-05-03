import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select2 from "../forms/select2Formik"
export default function Modulo({label,campo,callbackchange}){
    const {data:pacientes}=useCollection("pacientes",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
    if(!pacientes) return ""
    return(
        <Select2 callbackchange={callbackchange} campo={campo?campo:"paciente"} 
        label="Paciente"
         lista={pacientes} campoId="id" 
            campoLabel={(item)=>`${item.nombre} ${item.apellido} ${item.dni}`}  />
    )
}