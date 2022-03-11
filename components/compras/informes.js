import { Stack } from "@mui/material"
import { useCollection,fuego } from "@nandorojo/swr-firestore"
import { Fragment, useState } from "react"
import TitulosFormularios from "../forms/tituloFormularios"
import {getItemObject} from "../../helpers/arrays"
import Filtro from "./_filter"
import Tabla from "./_reporte"
import {formatMoney} from "../../helpers/numbers"
import {getFechaString} from "../../helpers/dates"
export default ({mod})=>{
    const [filtro,setFiltro]=useState({})
    const {data}=useCollection(mod.coleccion,filtro)
    const condiciones=[
        // {campo:"estado",condicional:"==",field:"estado"},
        {campo:"idEntidad",condicional:"==",field:"idEntidad"},
        {campo:"idCentroCosto",condicional:"==",field:"idCentroCosto"}
]
    const getWhere=(item,valores)=>{
        const valor=getItemObject({data:valores,keyBusca:item.campo})
      
        if(!valor)return null
        return [item.field,item.condicional,valor]
    }
    const buscar=(valores)=>{
        
        console.log(valores)
        
        const where=condiciones.map(item=>getWhere(item,valores) ).filter(n=>n)
        where.push(["idUsuario","==",fuego.auth().currentUser.uid])
  
        setFiltro({where})
    }
    
    return(
        <Stack> 
            <TitulosFormularios titulo="INFORME" subTitulo="de compras" icono="fas fa-file-contract"/>
            <Filtro callbackBuscar={buscar}/>
            <Tabla data={data} cols={
            [{label:"Fecha",field:"fecha",fn:(valor)=>{
                return getFechaString(valor)
            }
            },
            {label:"Detalle",field:"detalle"},
            {fn:formatMoney,align:"right" ,label:"$ Total",field:"importeTotal"}
            ]}
            />
        </Stack>
    )
}
