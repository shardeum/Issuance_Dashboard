// components/LineChart.js
import React from "react";
import {Bar} from "react-chartjs-2";
function LineChart({chartData}) {
  return (<div className="chart-container">
    <Bar data={chartData} options={{
        maintainAspectRatio: false,

        scales: {
          x: {
            beginAtZero: true,
            max: 820,
            min: 0,

            ticks: {
              includeBounds: true,
              beginAtZero: true,
              stepSize: 0.5

            },

            title: {
              color: 'White',
              display: true,
              text: 'Standby:Active Validator (S:A) Ratio',
              border: {
                color: 'white'
              }
            }
          },

          y: {
            title: {
              color: 'White',
              display: true,
              text: 'Time Validating %',
              border: {
                color: 'white'
              }
            }
          },
          y1: {
               type: 'linear',
               display: false,
               position: 'right',

               // grid line settings
               grid: {
                 drawOnChartArea: false, // only want the grid lines for one axis to show up
               },
               title: {
                 color: 'White',
                 display: true,
                 text: 'Time Validating %',
                 border: {
                   color: 'white'
                 }
               }
             },
        },

        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Standby:Active Validator (S:A) Ratio vs Time Validating %"
          },
          legend: {
            display: true
          },
          colors: {
            enabled: true
          }
        }

      }}/>
  </div>);
}
export default LineChart;
