// import React, { Component } from "react";
// import Chart from "react-apexcharts";
// export default function ChartDonut({ options, series, labels }) {
//   return (
//     <div className="donut">
//       <Chart
//         options={options}
//         series={series}
//         labels={labels}
//         type="donut"
//         width="380"
//       />
//     </div>
//   );
// }
import { formatMoney } from "@helpers/numbers";
import React, { Component, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

class ChartDonut extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formato = this.props.estadistica.formatoValorContable;
    return (
      <Chart
        options={{
          yaxis: {
            labels: {
              formatter: function (val, index) {
                if (formato) return formatMoney(val);
                return val;
              },
            },
          },
          labels: this.props.labels,
          formatter: function (val, index) {
            return val.toFixed(2);
          },
        }}
        series={this.props.series}
        type="donut"
      />
    );
  }
}

export default ChartDonut;
