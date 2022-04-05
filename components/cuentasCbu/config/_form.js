import DataGridFormikItems from "../../forms/dataGridFormik";

import FormTipoCuenta from "./_formTipocuenta"
import {ModeloTipoCuenta} from "../../../modelos/ModeloCuentasCbu"
import TabsFormik from "../../forms/tab";
import Grid from '@mui/material/Grid';
export default function FormConfig({}){
    
    return(
<TabsFormik label="Configs" vistas={[
        
        {label:"Tipo de cuentas",nro:0,vista:
        <Grid item md={12}>
        <DataGridFormikItems label="Categoria" Modelo={ModeloTipoCuenta} FormularioItem={FormTipoCuenta}  campo="itemsCategoriaSocios" columns={[
    { field: 'nombre', headerName: 'Nombre',width: 150 },
    ]}/>
            </Grid>
    },,
    ]}/>
    )
}