// App.js
import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {useState} from "react";
import {MonthlySHMData} from '.././components/MonthlySHMData.js';
import {InclusionData} from '.././components/InclusionData.js';
import {NetworkData} from '.././components/NetworkData.js';
import {RewardData} from '.././components/RewardData.js';
import ComboChart from ".././components/LineChart2";
import LineChart from ".././components/LineChart3";
import LineChart2 from ".././components/LineChart4";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.point.radius = 2;

export default function Emissions() {
  const [chartData] = useState({
    labels: InclusionData.map((data) => data.Validator_Standby_Ratio),
    datasets: [
      {
        label: "Total Nodes",
        data: InclusionData.map((data) => data.Total_Nodes),
        yAxisID: 'y',
      },
    {
      label: 'Time Spent Validating %',
      data: InclusionData.map((data) => data.Time_Validating),
      type: 'line',
      order: 0,
      yAxisID: 'y1',
    }
    ]
  });


  const [chartData2] = useState({
    labels: MonthlySHMData.map((data) => data.VSRatio),
    datasets: [
      {
        label: "$0.25",
        data: MonthlySHMData.map((data) => data.example1),
      },
      {
        label: "$0.50",
        data: MonthlySHMData.map((data) => data.example2),
      },
      {
        label: "$0.75",
        data: MonthlySHMData.map((data) => data.example3),
      },
      {
        label: "$1.00",
        data: MonthlySHMData.map((data) => data.example4),
      },
      {
        label: "$1.25",
        data: MonthlySHMData.map((data) => data.example5),
      },
      {
        label: "$1.50",
        data: MonthlySHMData.map((data) => data.example6),
      },
      {
        label: "$1.75",
        data: MonthlySHMData.map((data) => data.example7),
      },
      {
        label: "$2.00",
        data: MonthlySHMData.map((data) => data.example8),
      },
    ]
  });

  const [chartData3] = useState({
    labels: NetworkData.map((data) => data.VSRatio),
    datasets: [
    {
      label: 'Network Cost $',
      data: NetworkData.map((data) => data.NetworkCost),
      yAxisID: 'y',
    },

    {
      label: 'Network Reward $',
      data: RewardData.map((data) => data.SHMPrice),
      yAxisID: 'y1',
    }
  ],


  });





  return (<div className="App">

  <h2 className="text-lg font-bold">Shardeum Assumptions - Inclusion Time</h2>
  <p className="py-5">What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  <ComboChart chartData={chartData}/>
    <h2 className="text-lg font-bold">Shardeum Assumptions - Monthly SHM</h2>
    <p className="py-5">What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    <LineChart chartData={chartData2}/>
      <h2 className="text-lg font-bold">Shardeum Assumptions -  Network Operating Cost</h2>
      <p className="py-5">What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <LineChart2 chartData={chartData3}/>
  </div>);
}
