import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormSubitemColeccion from "../../forms/editarSubitemColeccion";

import DataGridFormikItems from "../../forms/dataGridFormik";
import FormItem from "./_form"
import {ModeloBootWeb} from "@modelos/ModeloPacientes"
import TabsFormik,{TabPanel} from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
export default function ConfigActividadad({mod}){
    const campo="config"
    const coleccion="mods"
    const datos=mod[campo]?mod[campo]:{}

     const valoresIniciales=()=>{
         return {nombre:"",tipo:""}
     }
     const callbackSuccess=()=>{
         
     }

    
    return(
        <Grid container>
         
                <Typography variant="h4" component="div" gutterBottom>
                    <TitulosFormularios titulo="CONFIGURACION" subTitulo="de pacientes" icono="fas fa-wrench"/>
                </Typography>
                <FormSubitemColeccion registro={mod} mod={mod} coleccion={coleccion} 
                campo={campo} datos={datos} 
                callbackSuccess={callbackSuccess} 
                valoresIniciales={valoresIniciales}  >
                <TabsFormik label="Configs" 
                    vistas={[
                        {label:"Acciones Web",nro:0,vista:
                           <DataGridFormikItems label="Acciones WEB" Modelo={ModeloBootWeb} 
                           FormularioItem={FormItem}  campo="itemsBootsWeb" 
                        columns={[
                            { field: 'label_bootWeb', headerName: 'Boot Web',width: 150 },
                            { field: 'parametros', headerName: 'Parametros',width: 350 },
                            
                            ]}/>
                           
                        },
                    ]}
                />
    </FormSubitemColeccion>
            
        </Grid>
    )
}