// src/components/PieChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Day 1 Distribution</h2>
      <Bar
        data={chartData}
        options={{
          aspectRatio: 1,
          plugins: {
            title: {
              display: true,
              text: "SHM Token Distribution Excluding Vesting"
            }
          }
        }}
      />
    </div>
  );
}
export default BarChart;
