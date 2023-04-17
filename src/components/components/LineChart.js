// components/LineChart.js
import React from "react";
import {Line} from "react-chartjs-2";
function LineChart({chartData}) {
  return (<div className="chart-container">
    <Line data={chartData} options={{
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
              text: 'Days Since Genesis',
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
            text: "SHM Vesting Schedule"
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
