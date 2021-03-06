import { Grid, Stack } from "@mui/material"
import FilterGenerico from "../filterGenerico"
import SelectEstaticFormik from "../forms/selectEstaticFormik"
import Select2 from '../forms/select2Formik';
import SelectFecha from '../forms/selectorFecha';
import { useCollection,fuego } from "@nandorojo/swr-firestore";

export default ({callbackBuscar})=>{
    const {data:centrosCosto}=useCollection("centroCostos",{where:["idUsuario","==",fuego.auth().currentUser?.uid]})
    const {data:proveedores}=useCollection("proveedores",{where:["idUsuario","==",fuego.auth().currentUser?.uid]})
    const estados=[{label:"PENDIENTE"},{label:"CANCELADO"}]
    const valoresIniciales={estado:"",idEntidad:"",idCentroCosto:""}
    return(
        <FilterGenerico callbackSuccess={callbackBuscar} valoresIniciales={valoresIniciales}>
           
                {/* <Grid item md={4}><SelectFecha label="Desde" campo="fechaDesde"/></Grid>
                <Grid item md={4}><SelectFecha label="Hasta" campo="fechaHasta"/></Grid> */}
                
                <Grid spacing={2} container>
                    <Grid item md={6}><Select2  campo='idCentroCosto' label="Centro de Costo" lista={centrosCosto} campoId="id" 
                    campoLabel="nombreCentroCosto" /></Grid>
                    <Grid item md={6}><Select2 campo='idEntidad' label="Proveedor" lista={proveedores} campoId="id" 
                    campoLabel="razonSocial" /></Grid>

                    {/* <Grid item md={6}><Select2 campo='estado' label="Estado" lista={estados} campoId="label" 
                    campoLabel="label" /></Grid> */}
                </Grid>
            
        </FilterGenerico>
    )
}