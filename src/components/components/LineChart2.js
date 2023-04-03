// components/LineChart.js
import React from "react";
import {Bar} from "react-chartjs-2";
function LineChart({chartData}) {
  return (<div className="chart-container">
    <h2 style={{
        textAlign: "center"
      }}>Validator Inclusion Time
</h2>
    <Bar data={chartData} options={{

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
              text: 'Validator:Standby Ratio',
              border: {
                color: 'white'
              }
            }
          },

          y: {
            title: {
              color: 'White',
              display: true,
              text: 'Total Network Nodes',
              border: {
                color: 'white'
              }
            }
          },
          y1: {
               type: 'linear',
               display: true,
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
            text: "Validator:Standby Ratio vs Time Validating %"
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
