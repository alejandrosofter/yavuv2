import DataGridFormikItems from "../../forms/dataGridFormik";
import FormCategoriaSocios from "./_formCategoriaSocios"
import FormTipoSocios from "./_formItemsTipoSocios"
import FormTipoDocumentacionSocios from "./_formTipoDocumentacion"
import FormGeneracionDeuda from "./_formGenerarDeuda"
import FormMotivos from "./_formMotivos"
import {ModeloConfig,ModeloTipoConfig, ModeloTipoSocios,ModeloCategoriaSocio,ModeloGeneracionDeuda,ModeloMotivos} from "../../../modelos/ModeloSocios"
import TabsFormik,{TabPanel} from "../../forms/tab";
import Grid from '@mui/material/Grid';
import Input from "../../forms/input"
export default function FormConfig({}){
    
    return(
<TabsFormik label="Configs" vistas={[
        
        {label:"Categorias Socio",nro:0,vista:
        <Grid item md={12}>
        <DataGridFormikItems label="Categoria" Modelo={ModeloCategoriaSocio} FormularioItem={FormCategoriaSocios}  campo="itemsCategoriaSocios" columns={[
    { field: 'nombre', headerName: 'Nombre',width: 150 },
    { field: 'condicion', headerName: 'Condicion',width: 100 },
    { field: 'label_idProducto', headerName: 'Producto/Servicio Asociado',width: 190 },
    ]}/>
            </Grid>
    },
    {label:"Tipos de Socios",nro:1,vista:
        <Grid item md={12}>
        <DataGridFormikItems label="Tipo Socios" Modelo={ModeloTipoSocios} FormularioItem={FormTipoSocios}  campo="itemsTipoSocios" columns={[
    { field: 'nombre', headerName: 'nombre',width: 250 },
    { field: 'proximoNro', headerName: 'Proximo Nro Socio',width: 150 },
    ]}/>
            </Grid>
    },
        {label:"Tipos Documentacion",nro:2,vista:
        <Grid item md={12}>
        
      <DataGridFormikItems label="Tipo de Documentacion" Modelo={ModeloTipoConfig} FormularioItem={FormTipoDocumentacionSocios}  campo="tiposDocumentacion" columns={[
  { field: 'nombreTipoDocumentacion', headerName: 'Tipo Documentacion',width: 450,  editable: true },
]}/>
        </Grid>
        },
        {label:"Generacion Deuda Socios",nro:3,vista:
        <Grid item md={12}>
        <DataGridFormikItems label="Generar Deuda" Modelo={ModeloGeneracionDeuda} FormularioItem={FormGeneracionDeuda}  campo="itemsGeneracionDeuda" columns={[
    { field: 'nombre', headerName: 'Nombre',width: 130 },
    { field: 'activo', headerName: 'Estado',width: 140 },
    { field: 'destino', headerName: 'Destino...',width: 130 },
    ]}/>
            </Grid>
    },
    {label:"Motivos Estados",nro:4,vista:
    <Grid item md={12}>
    <DataGridFormikItems label="Motivos Estados" Modelo={ModeloMotivos} FormularioItem={FormMotivos}  campo="itemsMotivosEstados" columns={[
{ field: 'detalle', headerName: 'Detalle',width: 330 },
{ field: 'estado', headerName: 'Asociado a ...',width: 130 },
]}/>
        </Grid>
},
    ]}/>
    )
}