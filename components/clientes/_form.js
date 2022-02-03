import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import Titulo from "../forms/tituloFormularios"
import SelectEstaticFormik from "../forms/selectEstaticFormik"
import SelectFormik from "../forms/select"

import ItemsModulo from "../forms/itemsModulo";
import { formatMoney } from "../../helpers/numbers";
import TabsFormik,{TabPanel} from "../forms/tab";
import { renderCellExpandData } from "../forms/datagrid/renderCellExpand";
const fnRender=(row)=>{
    let salida=""
    
    if(row.socios)
    for (let index = 0; index < row.socios.length; index++) {
        const socio = row.socios[index];
        salida+=`${index+1}-${socio.nombre} |  \n`
        
    }
   
    return salida
}
export default function FormClientes({titulo,subTitulo,icono,mod,setFieldValue,values}){

    return(
        <Grid >
            <Stack>
                <Titulo titulo={titulo} subTitulo={subTitulo} icono={icono}/>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        <Grid item md={4}><Input label="Apellido"  campo="apellido"/></Grid>
                        <Grid item md={3}><Input label="Nombre"  campo="nombre"/></Grid>
                    </Grid>
                        
            </Stack>                  
        </Grid>
    )
}