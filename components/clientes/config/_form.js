import DataGridFormikItems from "../../forms/dataGridFormik";

import FormTipos from "./_formTipos"
import {ModeloTipos} from "../../../modelos/ModeloClientes"
import TabsFormik,{TabPanel} from "../../forms/tab";
import Grid from '@mui/material/Grid';
import Input from "../../forms/input"
export default function FormConfig({}){
    
    return(
<TabsFormik label="Configs" vistas={[
        
        {label:"Tipo de Clientes",nro:0,vista:
        <Grid item md={12}>
        <DataGridFormikItems label="Tipo de Clientes" Modelo={ModeloTipos} FormularioItem={FormTipos}  campo="itemsTipos" columns={[
    { field: 'nombre', headerName: 'Nombre',width: 150 },
    { field: 'esEmpresa', headerName: 'Es empresa?',width: 100 },
    { field: 'default', headerName: 'Default',width: 100 },

    ]}/>
            </Grid>
    },
    
    ]}/>
    )
}