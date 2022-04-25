import SelectFormik from "@components/forms/select2Formik";

export default function MultiDias({callbackchange}){
const dias=[{label:"Lunes",value:"Lunes"},{label:"Martes",value:"Martes"},
{label:"Miercoles",value:"Miercoles"},{label:"Jueves",value:"Jueves"},
{label:"Viernes",value:"Viernes"},{label:"Sabado",value:"Sabado"},{label:"Domingo",value:"Domingo"}]
    return(<SelectFormik multiple={true} lista={dias} campoLabel="label" 
    campoId="value" callbackchange={callbackchange} campo='dias' label="Dias" />)
}