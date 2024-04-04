// src/components/PieChart.js
import React from "react";
import { Bar } from "react-chartjs-2";



function BarChart({ chartData, plugins }) {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
          plugins={plugins}
        options={{
          aspectRatio: 1,
          scales: {

            y: {
              title: {
                color: 'White',
                display: true,
                text: 'SHM',
                border: {
                  color: 'white'
                }
              }
            }
          },
          plugins: {

            datalabels: {
              formatter: (value, context) => {
                if(value === 259080000) {
                  return "Max Available"
                }
                  else {
                    return ""
                  }

              },
              rotation: 90,
              color: "white"
            },



            title: {
              display: true,
              text: "SHM Token Distribution"
            },
            colors: {
              enabled: true
            }
          }
        }}
      />
    </div>
  );
}
export default BarChart;
