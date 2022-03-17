import ItemsModulo from '../../../forms/itemsModulo'
import Form from "../../../socios/tarjetas/_formTarjetas"
import {getFechaString} from "../../../../helpers/dates"
import { ModeloTarjetas,valoresInicialesTarjetas } from "../../../../modelos/ModeloSocios"
import {cols} from  "../../../socios/tarjetas/index"
export default function Modulo({mod,setFieldValue,values}){
const field="tarjetas"
const label="CREDENCIALES"

    return(
        <ItemsModulo
        setFieldValue={setFieldValue} 
        campo={field} data={values[field]} 
        modelo={ModeloTarjetas}
        nombreModulo={label}
        fullWidth={true} maxWidth={"md"}
        textoEditar={`Puedes cambiar las acciones del registro:`}
        textoAgregar={`Ingrese los datos del registro`}
        valoresIniciales={valoresInicialesTarjetas} 
        form={<Form mod={mod} />} 
        dataModulo={[]} columnas={cols} 
              />
    )
}