import TitulosFormularios from "@components/forms/tituloFormularios"

import { Grid,TextField,Button,CircularProgress, Backdrop } from "@mui/material"
import { useDocument } from "@nandorojo/swr-firestore"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
export default function Modulo({mod,callbackSuccess}) {
  const [resultados,setResultados]=useState()
  const [loading,setLoading]=useState(false)
  const [dataInputs,setDataInputs]=useState(JSON.parse(localStorage.getItem("dataInputs")))
  const router=useRouter()
  const pathDoc=`${mod.coleccion}/${router.query.idItem}`
  const { data } = useDocument(pathDoc)



  const test=async ()=>{
    setLoading(true)
    localStorage.setItem("dataInputs",JSON.stringify(dataInputs))
    const res=await axios.post(`/api/bootsWeb/${router.query.idItem}`,{...dataInputs,id:router.query.idItem})
    setResultados(JSON.stringify(res.data))
    setLoading(false)
  }
  const cambia=(item,ev)=>{
  
    let aux=dataInputs
    aux[item.nombre]=ev.target.value
    setDataInputs(aux)
  }
  const getValor=item=>{
    return dataInputs[item.nombre]
  }
  if(!data)return "cargando data..."

      return (
 
                <Grid spacing={2} justifyContent="flex-end" container>
                    <Grid item md={12}>
                        <TitulosFormularios titulo={"TESTING"} subTitulo={mod.label} icono={mod.icono}/></Grid>
                        <Grid container item md={12}>
                        {data.entradas && data.entradas.map((item)=>
                          <Grid key={item.id} item md={2}>
                            <TextField defaultValue={getValor(item)}  onChange={cambia.bind(this,item)} label={item.nombre} />
                            </Grid>
                        )}
                        <Grid  item><Button variant="outlined" onClick={test}>INICIAR TEST</Button></Grid>
                        </Grid>
                    
                    <Grid item md={12}>
                    <TitulosFormularios subTitulo="RESULTADOS"/>
                        {resultados}
                    </Grid>
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={loading}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                </Grid>

      )

}