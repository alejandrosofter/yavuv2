import { Grid, Stack } from "@mui/material";
import TitulosFormularios from "../forms/tituloFormularios";
import GraficaAnual from "./graficaAnual"
import {GraficaTorta} from "./graficaTorta"
export default function Modulo({mod}){
    const ex1=[
        {fecha:new Date("2022/01/01"),importe:1000},
        {fecha:new Date("2022/02/02"),importe:1100},
        {fecha:new Date("2022/03/03"),importe:1200},
        {fecha:new Date("2022/04/04"),importe:1300},
        {fecha:new Date("2022/5/05"),importe:1400},
        {fecha:new Date("2022/6/06"),importe:1500},
        {fecha:new Date("2022/7/07"),importe:1600},
        {fecha:new Date("2022/8/08"),importe:1500},
        {fecha:new Date("2022/9/06"),importe:1200},
        {fecha:new Date("2022/10/10"),importe:1300},
        {fecha:new Date("2022/11/11"),importe:1400},
        {fecha:new Date("2022/12/12"),importe:1500},
        
    ]
    const ex2=[
        {fecha:new Date("2022/01/01"),importe:500},
        {fecha:new Date("2022/02/02"),importe:300},
        {fecha:new Date("2022/03/03"),importe:400},
        {fecha:new Date("2022/04/04"),importe:500},
        {fecha:new Date("2022/5/05"),importe:600},
        {fecha:new Date("2022/6/06"),importe:800},
        {fecha:new Date("2022/7/07"),importe:1000},
        {fecha:new Date("2022/8/08"),importe:900},
        {fecha:new Date("2022/9/06"),importe:800},
        {fecha:new Date("2022/10/10"),importe:700},
        {fecha:new Date("2022/11/11"),importe:600},
        {fecha:new Date("2022/12/12"),importe:500},
        
    ]
    const ex3=[
        {fecha:new Date("2022/01/01"),importe:50},
        {fecha:new Date("2022/02/02"),importe:80},
        {fecha:new Date("2022/03/03"),importe:90},
        {fecha:new Date("2022/04/04"),importe:100},
        {fecha:new Date("2022/5/05"),importe:150},
        {fecha:new Date("2022/6/06"),importe:100},
        {fecha:new Date("2022/7/07"),importe:40},
        {fecha:new Date("2022/8/08"),importe:50},
        {fecha:new Date("2022/9/06"),importe:20},
        {fecha:new Date("2022/10/10"),importe:80},
        {fecha:new Date("2022/11/11"),importe:100},
        {fecha:new Date("2022/12/12"),importe:150},
        
    ]
    const series=[44, 55, 41, 17]
    const labels=["CUOTA SOCIAL","ACTIVIDADES","ESCUELAS","CARNETS"]
    return(
       <Stack>
           ATENCION: graficas con data test!
            <Grid container >
           
           <Grid item md={5}><GraficaAnual data={ex1} titulo=" ESCUELAS"/></Grid>
          <Grid item md={5}><GraficaAnual data={ex2} titulo="ACTIVIDADES"/></Grid>
          <Grid item md={5}><GraficaAnual data={ex3} titulo="CUOTA SOCIAL"/></Grid>
          <Grid item md={5}><GraficaAnual tipo="donut" labels={labels} series={series} data={ex3} titulo="PRODUCTOS"/></Grid>
   
        </Grid>
       </Stack>
    )
}