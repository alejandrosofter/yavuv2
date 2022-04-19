import Select from "../forms/select"
export default function Modulo({mod,callbackchange,campo,label}){
    const data=mod.config?.tipoTurnos?mod.config?.tipoTurnos:[]
    if(!data) return ""
    return(
        <Select callbackchange={callbackchange} campo={campo?campo:"tipoTurno"} label={label?label:"Tipo Turno"}
         lista={data} campoId="id" 
            campoLabel="nombre" />
    )
}