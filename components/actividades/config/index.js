import useSWR from "swr"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";

import { useRouter } from "next/router";
import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormItem from "./_form"
import FormCompartir from "./_formCompartir"
import {ModeloConfig,ModeloTipoConfig, ModeloTipoSocios} from "@modelos/ModeloSocios"
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
                    <TitulosFormularios titulo="CONFIGURACION" subTitulo="de actividades" icono="fas fa-wrench"/>
                </Typography>
                <FormSubitemColeccion registro={mod} mod={mod} coleccion={coleccion} 
                campo={campo} datos={datos} 
                callbackSuccess={callbackSuccess} 
                valoresIniciales={valoresIniciales}  >
                <TabsFormik label="Configs" 
                    vistas={[
                        {label:"Conceptos",nro:0,vista:
                           
                                <DataGridFormikItems label="Conceptos" Modelo={ModeloConfig} FormularioItem={FormItem}  campo="itemsTipos" 
                                    columns={[ { field: 'detalle', headerName: 'Detalle',width: 450,  editable: true },]}/>
                           
                        },
                        
                    ]}
                />
    </FormSubitemColeccion>
            
        </Grid>
    )
}