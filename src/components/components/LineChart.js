// components/LineChart.js
import React from "react";
import {Line} from "react-chartjs-2";
function LineChart({chartData}) {
  return (<div className="chart-container">
    <h2 style={{
        textAlign: "center"
      }}>Issued vs Liquid SHM</h2>
    <Line data={chartData} options={{

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
              text: 'Day',
              border: {
                color: 'white'
              }
            }
          },

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

        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Vesting Schedule Excluding Node Reward"
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
