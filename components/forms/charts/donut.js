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
import React, { Component, useEffect } from "react";
import Chart from "react-apexcharts";

class ChartDonut extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Chart
        options={{ labels: this.props.labels }}
        series={this.props.series}
        type="donut"
      />
    );
  }
}

export default ChartDonut;
