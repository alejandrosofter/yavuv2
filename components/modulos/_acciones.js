import { Stack,Icon } from "@mui/material";
import { Box } from "@mui/system";
import { FieldArray,Field } from "formik";
import Input from "../forms/input"
import Button from '@mui/material/Button';
import CheckboxForm from "../forms/checkbox";
export default function _accionesModulos({campo,data,newItem}){

    return(
        <FieldArray name={campo}>
        {({ insert, remove, push }) => (
         <div>
            {data && data.length > 0 &&
              data.map((accion, index) => (
                <Stack key={`item_${index}`} sx={{mt:2}} direction="row" spacing={1}>
                  <Box sx={{ width: 150}} xs={2}> <Input campo={`${campo}.${index}.nombre`}  label="Nombre" /></Box>
                  <Box sx={{ width: 150}}><Input campo={`${campo}.${index}.label`}  label="Label" /></Box>
                  <Box sx={{ width: 150}}><Input campo={`${campo}.${index}.icono`}  label="Icono" /></Box>
                  <Box><Icon sx={{mt:4}} fontSize="small" className={accion.icono}/></Box>
                  <Box item xs={4}><Input campo={`${campo}.${index}.descripcion`}  label="Descripcion" /></Box>
                  <Box item xs={4}><Input campo={`${campo}.${index}.url`}  label="Url" /></Box>
                  <Box sx={{ width: 120}} ><CheckboxForm label="Funcion" campo={`${campo}.${index}.esFuncion`}/></Box>
                  <Box sx={{ width: 70}} ><Input label="Color" campo={`${campo}.${index}.color`}/></Box>

                  <Box sx={{ width: 120}} ><CheckboxForm label="De Registro" campo={`${campo}.${index}.esRegistro`}/></Box>
                  <Box item sx={{pt:2}} xs={3}>
                  <Button size="small" onClick={() => remove(index)} variant="outlined" color="error"><Icon fontSize="10px" className="fas fa-trash"/> </Button>
                  
                    </Box>
                    
                  </Stack>
                  
           
             
              ))}
            <Box item xs={2}>
                <Button size="large" onClick={() => push({newItem})}  variant="outlined" color="success"><Icon fontSize="10px" className="fas fa-plus"/>Agregar </Button>
            </Box>
          </div>
        )}
        
      </FieldArray>
    )
}