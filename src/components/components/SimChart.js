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

      scales: {
          x: {
              type: 'linear',
              title: {
                  display: true,
                  text: 'X'
              },
              min: 0,
              max: 2000,
              ticks: {
                  callback: (value, index, values) => {
                      return value.toFixed(2);
                  }
              }
          },
          'y-txvol': {
              type: 'logarithmic',
              position: 'right',
              title: {
                  display: true,
                  text: 'Tx Volume'
              },
              min: 0,
              max: Math.max(...txvolData),
          }

      },,
      'y-active': {
          type: 'linear',
          position: 'left',
          title: {
              display: false,
              text: 'Active Nodes'
          },
          min: Math.min.apply(null, activeDataset.map(function(a){return a.y;})),
          max: Math.max.apply(null, activeDataset.map(function(a){return a.y;})),
          grid: {
              drawOnChartArea: false
          }
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
