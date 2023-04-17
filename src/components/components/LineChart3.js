// components/LineChart.js
import React from "react";
import {Line} from "react-chartjs-2";
function LineChart({chartData}) {
  return (<div className="chart-container">
    <Line data={chartData} options={{

          maintainAspectRatio: false,

        scales: {
          x: {

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

            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, ticks) {
                    return '$' + value;
                },

                display: false
            },
            title: {
              color: 'White',
              display: true,
              text: 'Node Reward Monthly $',
              border: {
                color: 'white'
              }
            }
          },

        },

        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
              callbacks: {
                  label: function(context) {
                      let label = context.dataset.label || '';

                      if (label) {
                          label += ': ';
                      }
                      if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                      }
                      return label;
                  }
              }
          },
          title: {
            display: true,
            text: "Standby:Active Validator (S:A) Ratio vs Node Reward $/hr"
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
