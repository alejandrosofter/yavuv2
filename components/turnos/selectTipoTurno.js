import Select from "../forms/select2Formik"
import { getModUsuario } from "@helpers/db"
export default function Modulo({callbackchange,campo,label}){
    const mod=getModUsuario("turnos")
    const data=mod.config?.tipoTurnos?mod.config?.tipoTurnos:[]
    if(!data) return ""
    return(
        <Select callbackchange={callbackchange} campo={campo?campo:"tipoTurno"} label={label?label:"Tipo Turno"}
         lista={data} campoId="id" 
            campoLabel="nombre" />
    )
}