import React, { Component } from "react";
import Chart from "react-apexcharts";
import { getItemArrayKey } from "../../../helpers/arrays";

const suma=({arr,obj,campoSum})=>{
    const item=getItemArrayKey({data:arr,key:obj.valor})
   
    if(item)
        return item.map(item=>item[campoSum]).reduce((partialSum, a) => partialSum + a, 0).toFixed(2);
    
    return 0
    
}
export function PieChart({datos,campoSum,categorias}){
    const campoLabel=campoLabel?campoLabel:"label"
    const categoriasLabel=categorias.map(item=>item[campoLabel])
    const data=categorias.map(cat=>suma({arr:datos,obj:cat,campoSum:campoSum}))

    const estado = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: categoriasLabel
          }
        },
        series: [
          {
              name: "IMPORTE",
              data: data
            }
        ]
      }
      const updateData=()=>{
          console.log()
      }
      
    return(
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
            
                options={estado.options}
                series={estado.series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>
      )
}