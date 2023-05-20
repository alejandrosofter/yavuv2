import React, { Component } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { getItemArrayKey } from "../../helpers/arrays";

const suma = ({ arr, obj, campoSum }) => {
  const item = getItemArrayKey({ data: arr, key: obj.valor });
  if (item)
    return item
      .map((item) => item[campoSum])
      .reduce((partialSum, a) => partialSum + a, 0)
      .toFixed(2);

  return 0;
};

export function PieChart({
  datos,
  campoSum,
  categorias,
  tipo,
  series,
  labels,
}) {
  const campoLabel = campoLabel ? campoLabel : "label";
  const categoriasLabel = categorias.map((item) => item[campoLabel]);
  const data = categorias.map((cat) =>
    suma({ arr: datos, obj: cat, campoSum: campoSum })
  );

  const dataLabel = {};
  const estado = {
    options: {
      chart: {
        id: "basic-bar",
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(2) + "%";
        },
      },
      xaxis: {
        categories: categoriasLabel,
      },
      labels,
    },
    series: [
      {
        name: "IMPORTE",
        data: data,
      },
    ],
  };
  const updateData = () => {
    console.log();
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={estado.options}
            series={series ? series : estado.series}
            type={tipo ? tipo : "bar"}
            width="500"
          />
        </div>
      </div>
    </div>
  );
}
