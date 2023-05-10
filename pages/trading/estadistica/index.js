import { Stack } from "@mui/material";
import { Fragment } from "react";
import TitulosFormularios from "../../forms/tituloFormularios";
import ChartPie from "./pieChart"
import {PieChart} from "./pieChart2"
import {useCollection} from '@nandorojo/swr-firestore'
import {groupBy} from "../../../helpers/arrays"
export default function Stats({mod}) {
      const categorias=[
      {label:"ENE",valor: 1 }, {label:"FEB",valor: 2 }, {label:"MAR",valor: 3 }, 
      {label:"ABR",valor:4 } , {label:"MAY",valor:5 }, {label:"JUN",valor: 6 },
      {label:"JUL",valor: 7 },{label:"AGO",valor: 8 }, {label:"SEP",valor: 9 },
      {label:"OCT",valor:10 },{label:"NOV",valor: 11 },{label:"DIC",valor: 12 }]
    const {data}=useCollection("tradings")
    if(!data)return "cargando"
    const agrupado=groupBy(data,trading=>
          ("fecha" in trading)&&new Date(trading.fecha.seconds * 1000).getMonth()
    )
      return (
            <div style={{ width: "100%" }}>
                  <TitulosFormularios titulo="STATS" subTitulo="de los tradings BOT" icono="fas fa-chart-area"/>
                  <PieChart datos={agrupado} campoSum="porcentualGanancia" categorias={categorias} />
                  <PieChart datos={agrupado} campoSum="importeBeneficio" categorias={categorias} />
          </div>
      )
}