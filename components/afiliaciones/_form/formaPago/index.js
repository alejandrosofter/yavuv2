import ItemsModulo from '../../../forms/itemsModulo'
import Form from "../../../socios/cobros/_form"
import {getFechaString} from "../../../../helpers/dates"
import { ModeloCobros,valoresCobros } from "../../../../modelos/ModeloSocios"
import {cols} from  "../../../socios/cobros/index"
export default function Modulo({mod,setFieldValue,values}){
const field="formaPago"
const label="FORMA DE PAGO"

    return(
        <ItemsModulo
        setFieldValue={setFieldValue} 
        campo={field} data={values[field]} 
        modelo={ModeloCobros}
        nombreModulo={label}
        fullWidth={true} maxWidth={"md"}
        textoEditar={`Puedes cambiar las acciones del registro:`}
        textoAgregar={`Ingrese los datos del registro`}
        valoresIniciales={valoresCobros} 
        form={<Form mod={mod} />} 
        dataModulo={[]} columnas={cols} 
              />
    )
}