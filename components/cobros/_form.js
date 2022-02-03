import Stack from '@mui/material/Stack';
import { Grid,Typography,Button } from "@mui/material";
import Titulo from '../forms/tituloFormularios';
import SelectFecha from '../forms/selectorFecha';
import ItemsModulo from "../forms/itemsModulo";
import Input from "../forms/input"
import FormItem from "./_formItem"
import FormItemPago from "./_formItemPago"
import {ModeloItems,ModeloFormasDePago,valoresInicialesFormaPago,valoresInicialesItems} from "../../modelos/ModeloCobros"

import SelectEstaticFormik from '../forms/selectEstaticFormik';
import BuscadorCliente from "../clientes/_buscador"
import SelectAlgoliaFormik from '../forms/selectAlgoliaFormik';
import { useState } from 'react';
import Fetch from '../../helpers/Fetcher';
import {formatMoney} from '../../helpers/numbers';
import TabsFormik,{TabPanel} from "../forms/tab";
export default function Modulo({setFieldValue,values,token,mod}) {
    const [clienteSeleccion,setClienteSeleccion]=useState()
    const [importeRestoPagar,setImporteRestoPagar]=useState(0)
    const [importeDebe,setImporteDebe]=useState(0)
    const [importeHaber,setImporteHaber]=useState(0)
    const [deuda,setDeuda]=useState([])
    const addData=(props)=>{
        deuda.map(item=>{
            props.push({...item,detalle:`${item.label_elemento}(${item.label_concepto})`})
       
        })
        cambiaItems([...deuda,...values['deudas']?values['deudas']:[]])
    }
    const calculaImporteResto=()=>{
        console.log(importeDebe,importeHaber)
        setImporteRestoPagar(importeDebe-importeHaber)
    
    }
    const cambiaItems=(items)=>{
        let importe=0,bonificacion=0,total=0
        console.log(importe,bonificacion,total)
        items.forEach(item=>{
          
            importe+=Number(item.importe)
            bonificacion+=Number(item.importeBonificacion)
            
        })
        total+=importe-bonificacion
        
        setFieldValue("importe",importe)
        setFieldValue("importeBonificacion",bonificacion)
        setFieldValue("importeTotal",total)
        setImporteDebe(total)
        calculaImporteResto()
    }
    const cambiaItemsFormaPago=(items)=>{
        let importe=0
 
        items.forEach(item=>{
          
            importe+=Number(item.importe)
            
        })
        setImporteHaber(importe)
        setFieldValue("importePaga",importe)
        calculaImporteResto()
    }
    const buscarDeuda=async (cliente)=>{ 
       const url=`/api/socios_deuda/${cliente?cliente.objectID:clienteSeleccion.objectID}`
    
        const aux=await Fetch(url,null,null,token)
        if(aux.datos) setDeuda(aux.datos) 
        else setDeuda([]) 
        
    }
    const cambiaCliente=(cliente)=>{ 
        setClienteSeleccion(cliente)
        setTimeout(() => {
            buscarDeuda(cliente)
        }, 500);
        
    }
      return (
            <Grid md={8}>
            <Stack> 
                <Titulo titulo={"COBRO"} subTitulo={"deuda"} icono={"fas fa-user"}/>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        <Grid item md={6}><SelectAlgoliaFormik callbackchange={cambiaCliente} coleccionAlgolia="clientes" label="Cliente" campo="cliente"/>
                       
                        </Grid>
                        <Grid item md={3}><SelectFecha label="Fecha" campo="fecha"/></Grid>
                        <Grid item md={3}><SelectEstaticFormik items={["PENDIENTE","CANCELADA"]}  label="ESTADO" campo="estado"/></Grid>
                        <Grid item md={2}><Input label="$ Importe"  campo="importe"/></Grid>
                        <Grid item md={2}><Input label="$ Bonif"  campo="importeBonificacion"/></Grid>
                        <Grid item md={2}><Input label="$ Total"  campo="importeTotal"/></Grid>
                        <Grid item md={2}><Input label="$ PAGA"  campo="importePaga"/></Grid>
                        <Grid item md={12}>
                        <TabsFormik label="Gral" vistas={[
        {label:"Items",nro:0,vista:
        <ItemsModulo
        fnCambia={cambiaItems}
            setFieldValue={setFieldValue} 
            campo="deudas" data={values.deudas} dataExtra={deuda} fnAddData={addData}
            modelo={ModeloItems}
            nombreModulo="ITEMS DEUDA" 
            fullWidth={true} maxWidth={"md"}
            textoEditar={`Puedes cambiar las propiedades:`}
            textoAgregar={`Ingrese los datos `}
            valoresIniciales={valoresInicialesItems()} 
            form={<FormItem mod={mod} />} 
            dataModulo={[]} columnas={[
                                            { field: 'detalle',headerName: 'Detalle', width: 280,  },
                { field: 'importe',headerName: '$ Importe', width: 180,renderCell: (params) => { return formatMoney(params.value)}  },
                
                { field: 'importeBonificacion',headerName: '$ Bonif.', editable: false, width: 80,
                renderCell: (params) => { return formatMoney(params.value)}  },
                
                ]} 
                />},
        {label:"Forma de Pago",nro:1,vista:
        <ItemsModulo
        fnCambia={cambiaItemsFormaPago}
            setFieldValue={setFieldValue} 
            data={values.formasDePago}
            campo="formasDePago" 
            modelo={ModeloFormasDePago}
            nombreModulo="Forma de Pago" 
            fullWidth={true} maxWidth={"md"}
            textoEditar={`Puedes cambiar las propiedades:`}
            textoAgregar={`Ingrese los datos `}
            valoresIniciales={valoresInicialesFormaPago(importeRestoPagar)} 
            form={<FormItemPago token={token} />} 
            dataModulo={[]} columnas={[
                { field: 'label_formaPago',headerName: 'Forma de Pago', width: 280,  },
                { field: 'importe',headerName: '$ Importe', width: 180,renderCell: (params) => { return formatMoney(params.value)}  },
                
                
                ]} 
                />
    },
    
        ]}/>
                       
                        </Grid>
            
                    </Grid>
            </Stack>                  
        </Grid>
      )

}