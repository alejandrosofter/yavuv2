import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import {ModeloSalidas,ModeloEntradas,ModelRutinas} from "@modelos/ModeloBootsWeb"
import FormItem from "./_formItem"
import FormEntradas from "./_formEntradas"
import FormRutina from "./_formRutina"
import ItemsModulo from "@components/forms/itemsModulo";
import TabsFormik from "@components/forms/tab";
import DataGridFormikItems from "@components/forms/dataGridFormik";
export default function Form({mod,setFieldValue,values}){

    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item md={4}><Input label="Nombre"  campo="nombre"/></Grid>
                        <Grid item md={12}>
                        <TabsFormik label="Configs" vistas={[
                            {
                                label:"Entradas",nro:0,vista:
                                <Grid item md={12}>
                                <DataGridFormikItems label="Entradas" Modelo={ModeloEntradas} 
                                FormularioItem={FormEntradas}  campo="entradas" columns={[
                                    { field: 'nombre',headerName: 'Nombre', editable: false, width: 120,  },
                                    ]}/>
                                            </Grid>
                            },
                                
                                {
                                    label:"Rutina",nro:1,vista:
                                    <Grid item md={12}>
                                    <DataGridFormikItems label="Rutina" Modelo={ModelRutinas} 
                                    FormularioItem={FormRutina}  campo="rutinas" columns={[
                                        { field: 'accion',headerName: 'Accion',width: 80,  },
                                        { field: 'selector',headerName: 'Selector',width: 320,  },
                                        
                                        { field: 'parametros',headerName: 'Params',width: 220,  },
                                        { field: 'esEntrada',headerName: 'Es Entrada?',width: 80,  },
                                        ]}/>
                                                </Grid>
                                }
                        ]} />
                        
                        </Grid>
                        
                       
                   </Grid>
                        
            </Stack>                  
        </Grid>
    )
}