// src/components/PieChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
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
