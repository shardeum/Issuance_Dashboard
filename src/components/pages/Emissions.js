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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useState} from "react";
import {EmmisionsData} from '.././components/EmmisionsData.js';
import {DistributionData} from '.././components/DistributionData.js';
import LineChart from ".././components/LineChart";
import PieChart from ".././components/PieChart";
import BarChart from ".././components/BarChart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.point.radius = 2;

export default function Emissions() {
  const [chartData] = useState({
    labels: EmmisionsData.map((data) => data.Day),
    datasets: [
      {
        label: "Issued SHM",
        data: EmmisionsData.map((data) => data.Issuded_SHM)
      }, {
        label: "Liquid SHM",
        data: EmmisionsData.map((data) => data.TotalLiquid_SHM)
      }, {
        label: "Foundation",
        data: EmmisionsData.map((data) => data.Foundation)
      }, {
        label: "Ecosystem",
        data: EmmisionsData.map((data) => data.Ecosystem)
      }, {
        label: "Team",
        data: EmmisionsData.map((data) => data.Team_Total)
      }, {
        label: "Sale",
        data: EmmisionsData.map((data) => data.Sale_Total)
      }, {

        label: "Node Reward",
        data: EmmisionsData.map((data) => data.Node_Rewards_Day)
      }
    ]
  });

  const [chartData2] = useState({
    labels: DistributionData.map((data) => data.Distribution),
    datasets: [
      {
        label: "Issued SHM - Tokens",
        data: DistributionData.map((data) => data.SHM)
      },

    ]


  });

  const [chartData3] = useState({
    labels: DistributionData.map((data) => data.Distribution),
    datasets: [
      {
        label: "Issued SHM - Tokens",
        data: DistributionData.map((data) => data.SHM),

      },
    ]
  });

  return (<div className="App">
    <h2 className="text-lg font-bold">Shardeum Distribution</h2>
    <p className="py-5">What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    <p className="py-5">What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    <div className="flex">
    <BarChart chartData={chartData2}/>
    <PieChart plugins={[ChartDataLabels]} chartData={chartData3} />
    </div>
    <h2 className="text-lg font-bold">Shardeum Emmisions</h2>
    <p className="py-5">What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    <p className="py-5">What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    <LineChart chartData={chartData}/>
  </div>);
}
