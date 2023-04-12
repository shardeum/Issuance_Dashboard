// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({chartData, plugins}) {
  return (
    <div className="chart-container">
      <Pie
        data={chartData}
        plugins={plugins}
        options={{
           plugins: {

            title: {
              display: true,
              text: "SHM Distribution Percentage"
            },
            datalabels: {
                display: true,
                font: {
                       size: 12,
                       weight: 'bold'
                   },
                formatter: (value, ctx) => {

                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map(data => {
                  return sum += data;
                  });
                  let percentage = (value*100 / sum).toFixed(2)+"%";
                  return percentage;

                },
                color: '#fff',
              },
          }
        }}
      />
    </div>
  );
}
export default PieChart;
