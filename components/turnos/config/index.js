import useSWR from "swr"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormSubitemColeccion from "../../forms/editarSubitemColeccion";

import { useRouter } from "next/router";
import DataGridFormikItems from "../../forms/dataGridFormik";
import FormItem from "./_form"
import {ModeloConfig,ModeloTipoConfig, ModeloTipoSocios} from "../../../modelos/ModeloSocios"
import TabsFormik,{TabPanel} from "../../forms/tab";
import TitulosFormularios from "../../forms/tituloFormularios";
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
                    <TitulosFormularios titulo="CONFIGURACION" subTitulo="de turnos" icono="fas fa-wrench"/>
                </Typography>
                <FormSubitemColeccion registro={mod} mod={mod} coleccion={coleccion} 
                campo={campo} datos={datos} 
                callbackSuccess={callbackSuccess} 
                valoresIniciales={valoresIniciales}  >
                <TabsFormik label="Configs" 
                    vistas={[
                        {label:"Tipo de Turnos",nro:0,vista:
                           
                                <DataGridFormikItems label="Tipo de Turnos" 
                                Modelo={ModeloConfig} FormularioItem={FormItem}  campo="tipoTurnos" 
                                    columns={[
                                        { field: 'nombre', headerName: 'Nombre',width: 350 },
                                        { field: 'duracion', headerName: 'Duracion',width: 80 }
                                         ,]}/>
                           
                        },
                    ]}
                />
    </FormSubitemColeccion>
            
        </Grid>
    )
}