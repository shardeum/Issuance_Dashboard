// components/LineChart.js
import React from "react";
import {Line} from "react-chartjs-2";
function LineChart({chartData}) {
  return (<div className="chart-container">
    <h2 style={{
        textAlign: "center"
      }}>Monthly Reward $
</h2>
    <Line data={chartData} options={{
          maintainAspectRatio: false,

        scales: {
          x: {

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

            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, ticks) {
                    return '$' + value;
                }
            },
            title: {
              color: 'White',
              display: true,
              text: 'Reward $',
              border: {
                color: 'white'
              }
            }
          },

        },

        responsive: true,
        plugins: {
          tooltip: {
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
            text: "Validator:Standby Ratio vs SHM Price $"
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
