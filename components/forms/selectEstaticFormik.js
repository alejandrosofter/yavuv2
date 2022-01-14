import SelectFormik from "./select";

export default function SelectEstaticFormik({label,campo,items,callbackchange}){

    return(
        <SelectFormik callbackchange={callbackchange} label={label} lista={items&&items.map(item=>({nombre:item,id:item}) )} campoLabel={"nombre"} campoId="id" campo={campo}/>
    )
}