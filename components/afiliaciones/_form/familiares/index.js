import ItemsModulo from '../../../forms/itemsModulo'
import Form from "../../../socios/familiares/_form"
import {getFechaString} from "../../../../helpers/dates"
import { ModeloFamiliares,valoresInicialesFamiliares } from "../../../../modelos/ModeloSocios"
import {cols} from  "../../../socios/familiares/index"
export default function Modulo({mod,setFieldValue,values}){
const field="familiares"
const label="FAMILIARES"

    return(
        <ItemsModulo
        setFieldValue={setFieldValue} 
        campo={field} data={values[field]} 
        modelo={ModeloFamiliares}
        nombreModulo={label}
        fullWidth={true} maxWidth={"md"}
        textoEditar={`Puedes cambiar las acciones del registro:`}
        textoAgregar={`Ingrese los datos del registro`}
        valoresIniciales={valoresInicialesFamiliares} 
        form={<Form mod={mod} />} 
        dataModulo={[]} columnas={cols} 
              />
    )
}