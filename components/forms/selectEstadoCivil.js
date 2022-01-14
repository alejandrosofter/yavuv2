import SelectEstaticFormik from "./selectEstaticFormik";

export default function SelectEstadoCivilFormik({}){
const lista=["Soltero/a","Casado/a","Otros"]
    return(
        <SelectEstaticFormik label="Estado Civil" items={lista} campo="estadoCivil"/>
    )
}