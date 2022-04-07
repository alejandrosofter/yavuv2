import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import {ModeloItems,ModeloPeriodos,valoresInicialesPeriodos,valoresInicialesItems} from "../../modelos/ModeloActividades"

import Titulo from "../forms/tituloFormularios"
import SelectEstaticFormik from "../forms/selectEstaticFormik"
import SelectFormik from "../forms/select"
import FormItem from "./_formItem"
import FormPeriodo from "./_formPeriodo"
import useSWR from "swr";
import ItemsModulo from "../forms/itemsModulo";
import { formatMoney } from "../../helpers/numbers";
import TabsFormik,{TabPanel} from "../forms/tab";
import { renderCellExpandData } from "../forms/datagrid/renderCellExpand";
import { useCollection } from '@nandorojo/swr-firestore'
const fnRender=(row)=>{
    let salida=""
    
    if(row.socios)
    for (let index = 0; index < row.socios.length; index++) {
        const socio = row.socios[index];
        salida+=`${index+1}-${socio.nombre} |  \n`
        
    }
   
    return salida
}
export default function FormActividad({mod,setFieldValue,values}){
    const { data:profesores } = useCollection(`profesores`)
    if(!profesores)return "Buscando profesores..."
    return(
     
          
                    <Grid container rowSpacing={2} spacing={2}>
                        <Grid item md={2}><Input label="Nombre Actividad"  campo="nombreActividad"/></Grid>
                        
                        <Grid item md={2}><SelectEstaticFormik items={["ACTIVA","RECESO","SUSPENDIDA"]}  label="ESTADO" campo="estado"/></Grid>
                        <TabsFormik label="Configs" vistas={[
                            {label:`SUB-ACTIVIDADES (${values.subActividades?values.subActividades.length:0})`,nro:0,vista: 
                            <ItemsModulo
                            setFieldValue={setFieldValue} 
                            campo="subActividades" data={values.subActividades} 
                            modelo={ModeloItems}
                            nombreModulo="SUB-ACTIVIDADES" 
                            fullWidth={true} maxWidth={"md"}
                            textoEditar={`Puedes cambiar las propiedades de la actividad:`}
                            textoAgregar={`Ingrese los datos de la actividad`}
                            valoresIniciales={valoresInicialesItems()} 
                            form={<FormItem mod={mod} profesores={profesores}/>} 
                            dataModulo={[]} columnas={[
                                { field: 'nombreActividad',headerName: 'Nombre', editable: false, width: 200,  },
                                
                                
                                { field: 'label_profesor',headerName: 'Profesor', width: 280,  },
                                { field: 'estado',headerName: 'Estado', width: 80,  },
                           
                                
                                ]} 
                                />
                            },
                            {label:`PERIODOS (${values.periodos?values.periodos.length:0})`,nro:1,vista: 
                            <ItemsModulo
                            setFieldValue={setFieldValue} 
                            campo="periodos" data={values.periodos} 
                            modelo={ModeloPeriodos}
                            nombreModulo="PERIODOS" 
                            fullWidth={true} maxWidth={"md"}
                            textoEditar={`Puedes cambiar las propiedades del registro:`}
                            textoAgregar={`Ingrese los datos del registro`}
                            valoresIniciales={valoresInicialesPeriodos()} 
                            form={<FormPeriodo mod={mod} />} 
                            dataModulo={[]} columnas={[
                               
                                { field: 'nombrePeriodo',headerName: 'Nombre', width: 190,  },
                                { field: 'socios',headerName: 'Participantes', width: 380, 
                                renderCell: (params) => renderCellExpandData(params,fnRender) },
                                { field: 'estado',headerName: 'Estado', width: 180 }
                                
                                ]} 
                                />
                            }
                        ]}
                        />
        
            
                    </Grid>
                             
     
    )
}