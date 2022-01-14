import SelectEstaticFormik from "./selectEstaticFormik";

export default function SelectSexoFormik({}){
const lista=["Femenino","Masculino"]
    return(
        <SelectEstaticFormik label="Sexo" items={lista}  campo="sexo"/>
    )
}