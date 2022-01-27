import useSWR from "swr"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormSubitemColeccion from "../../forms/editarSubitemColeccion";

import { useRouter } from "next/router";
import DataGridFormikItems from "../../forms/dataGridFormik";
import FormItem from "./_formItems"
import {ModeloConfig,ModeloTipoConfig, ModeloTipoSocios} from "../../../modelos/ModeloSocios"
import TabsFormik,{TabPanel} from "../../forms/tab";
import TitulosFormularios from "../../forms/tituloFormularios";
export default function ConfigActividadad({modulo,token,dataUsuario,idUsuario,auth,dataCuenta}){
    const router=useRouter();
    const url=`/api/mod/${router.query.id}`
    const urlAcepta=`/api/mod/abmItem?subColeccion=config`
    const subItem="config"

    const { data:datos, mutate,isValidating } = useSWR(url)
     const callbackSuccess=e=>{
  
     }
     const valoresIniciales=()=>{
         return {nombre:"",tipo:""}
     }
     const getDatosSubItem=()=>{
         if(datos[subItem])return datos[subItem]
         return {}
     }
    if(!datos)return `Cargando ${url}... `
    
    return(
        <Grid container>
         
                <Typography variant="h4" component="div" gutterBottom>
                    <TitulosFormularios titulo="CONFIGURACION" subTitulo="de actividades" icono="fas fa-wrench"/>
                </Typography>
                <FormSubitemColeccion registro={datos} datos={getDatosSubItem()} urlAcepta={urlAcepta} callbackSuccess={callbackSuccess} 
                token={token} modulo={modulo} valoresIniciales={valoresIniciales} dataUsuario={dataUsuario} 
                auth={auth} idUsuario={idUsuario} dataCuenta={dataCuenta} >
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