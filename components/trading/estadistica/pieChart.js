import React, { Component } from "react";
import Chart from "react-apexcharts";
import { getItemArrayKey } from "../../../helpers/arrays";

const suma = ({ arr, obj, campoSum }) => {
  const item = getItemArrayKey({ data: arr, key: obj.valor });

  if (item)
    return item
      .map((item) => item[campoSum])
      .reduce((partialSum, a) => partialSum + a, 0)
      .toFixed(2);

  return 0;
};
class App extends Component {
  constructor(props) {
    super(props);
    const campoLabel = props.campoLabel ? props.campoLabel : "label";

    const data = props.categorias.map((cat) =>
      suma({ arr: props.datos, obj: cat, campoSum: props.campoSum })
    );
    const categoriasLabel = props.categorias.map((item) => item[campoLabel]);
    //

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: categoriasLabel,
        },
      },
      series: [
        {
          name: "IMPORTE",
          data: data,
        },
      ],
    };
  }
  updateData(d) {}
  render(d) {
    return (
      <div className="app">
        <div className="row">
          <button onClick={this.updateData}>Update</button>
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
