import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import {ModeloItems,valoresInicialesItems} from "../../modelos/ModeloActividades"
import Titulo from "../forms/tituloFormularios"
import SelectEstaticFormik from "../forms/selectEstaticFormik"
import SelectFormik from "../forms/select"
import FormItem from "./_formItem"
import useSWR from "swr";
import ItemsModulo from "../forms/itemsModulo";
import { formatMoney } from "../../helpers/numbers";
export default function FormActividad({titulo,subTitulo,icono,setFieldValue,values}){
    const { data:profesores } = useSWR(`/api/profesores`)
    if(!profesores)return "Buscando profesores..."
    return(
        <Grid >
            <Stack>
                <Titulo titulo={titulo} subTitulo={subTitulo} icono={icono}/>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        <Grid item md={2}><Input label="Nombre Actividad"  campo="nombreActividad"/></Grid>
                        
                        <Grid item md={2}><SelectEstaticFormik items={["ACTIVA","RECESO","SUSPENDIDA"]}  label="ESTADO" campo="estado"/></Grid>
                        <Grid item xs={12}>
            <ItemsModulo
                   setFieldValue={setFieldValue} 
                   campo="subActividades" data={values.subActividades} 
                   modelo={ModeloItems}
                   nombreModulo="SUB-ACTIVIDADES" 
                   fullWidth={true} maxWidth={"md"}
                   textoEditar={`Puedes cambiar las propiedades de la actividad:`}
                   textoAgregar={`Ingrese los datos de la actividad`}
                   valoresIniciales={valoresInicialesItems()} 
                   form={<FormItem profesores={profesores}/>} 
                   dataModulo={[]} columnas={[
                        { field: 'nombreActividad',headerName: 'Nombre', editable: false, width: 200,  },
                        
                        
                        { field: 'label_profesor',headerName: 'Profesor', width: 280,  },
                        { field: 'estado',headerName: 'Estado', width: 80,  },
                        { field: 'importe',headerName: 'Importe', editable: false, width: 80,
                        renderCell: (params) => { return formatMoney(params.value)}  },
                        
                        ]} 
                         />
            </Grid>
                    </Grid>
            </Stack>                  
        </Grid>
    )
}