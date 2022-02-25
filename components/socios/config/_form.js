import DataGridFormikItems from "../../forms/dataGridFormik";
import FormItemConfigSocios from "./_formItems"
import FormTipoSocios from "./_formItemsTipoSocios"
import FormTipoDocumentacionSocios from "./_formTipoDocumentacion"
import {ModeloConfig,ModeloTipoConfig, ModeloTipoSocios} from "../../../modelos/ModeloSocios"
import TabsFormik,{TabPanel} from "../../forms/tab";
import Grid from '@mui/material/Grid';
import Input from "../../forms/input"
export default function FormConfig({}){
    
    return(
<TabsFormik label="Configs" vistas={[
        {label:"GRAL",nro:0,vista:
        <Grid spacing={1} item container md={12} >
            <Grid item md={2}><Input label="Edad Adherente"  campo="edadAdherente"/></Grid>
            <Grid item md={2}><Input label="$ Adherente"  campo="importeAdherente"/></Grid>
            <Grid item md={2}><Input label="$ Participante"  campo="importParticipante"/></Grid>
            <Grid item md={2}><Input label="$ Activo"  campo="importeActivo"/></Grid>
        </Grid>},
        {label:"Conceptos",nro:1,vista:
        <Grid item md={12}>
        <DataGridFormikItems label="Conceptos" Modelo={ModeloConfig} FormularioItem={FormItemConfigSocios}  campo="itemsTipos" columns={[
    { field: 'detalle', headerName: 'Detalle',width: 450,  editable: true },
    ]}/>
            </Grid>
    },
    {label:"Tipos de Socios",nro:2,vista:
        <Grid item md={12}>
        <DataGridFormikItems label="Tipo Socios" Modelo={ModeloTipoSocios} FormularioItem={FormTipoSocios}  campo="itemsTipoSocios" columns={[
    { field: 'nombre', headerName: 'nombre',width: 250 },
    { field: 'proximoNro', headerName: 'Proximo Nro Socio',width: 150 },
    ]}/>
            </Grid>
    },
        {label:"Tipos Documentacion",nro:3,vista:
        <Grid item md={12}>
        
      <DataGridFormikItems label="Tipo de Documentacion" Modelo={ModeloTipoConfig} FormularioItem={FormTipoDocumentacionSocios}  campo="tiposDocumentacion" columns={[
  { field: 'nombreTipoDocumentacion', headerName: 'Tipo Documentacion',width: 450,  editable: true },
]}/>
        </Grid>
        },]}/>
    )
}