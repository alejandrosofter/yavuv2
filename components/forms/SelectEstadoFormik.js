import SelectEstaticFormik from "./selectEstaticFormik";

export default function SelectEstadoFormik({estados}){

    return(
        <SelectEstaticFormik label="Estado " items={estados} campo="estado"/>
    )
}