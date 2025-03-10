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
  Legend,
  Colors
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useState} from "react";
import {EmmisionsData} from '.././components/EmmisionsData.js';
import {DistributionData} from '.././components/DistributionData.js';
import LineChart from ".././components/LineChart";
import PieChart from ".././components/PieChart";
import BarChart from ".././components/BarChart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors);

Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.point.radius = 2;

export default function Emissions() {
  const [chartData] = useState({
    labels: EmmisionsData.map((data) => data.Day),
    datasets: [
      {
        label: "Liquid SHM",
        data: EmmisionsData.map((data) => data.TotalLiquid_SHM)
      }, {
        label: "Foundation",
        data: EmmisionsData.map((data) => data.Foundation)
      }, {
        label: "Ecosystem & Airdrops",
        data: EmmisionsData.map((data) => data.Ecosystem)
      }, {
        label: "Team",
        data: EmmisionsData.map((data) => data.Team_Total)
      }, {
        label: "Sale",
        data: EmmisionsData.map((data) => data.Sale_Total)
      }
    ]
  });

  const [chartData2] = useState({
    labels: DistributionData.map((data) => data.Distribution),
    datasets: [
      {
        label: "Issued SHM - Tokens",
        data: DistributionData.map((data) => data.SHM)
      }
    ]

  });

  const [chartData3] = useState({
    labels: DistributionData.map((data) => data.Distribution),
    datasets: [
      {
        label: "Issued SHM - Tokens",
        data: DistributionData.map((data) => data.SHM)
      }
    ]
  });

  return (<div className="App pt-5 sm:pt-0">
    <h2 className="text-lg font-bold">Shardeum Distribution</h2>
    <p className="pt-5">248,920,000 SHM will be given to the Foundation, Ecosystem & Airdrops, Team, and Sale accounts at genesis. </p>
    <p className="py-5">The below graphs show SHM distribution at a token (graph 1) and percentage (graph 2) level.</p>

    <div className="flex-1 flex-col sm:flex sm:flex-row">
      <BarChart plugins={[ChartDataLabels, Colors]} chartData={chartData2}/>
      <PieChart plugins={[ChartDataLabels]} chartData={chartData3}/>
    </div>
    <h2 className="text-lg font-bold pt-10">Shardeum Emissions</h2>

    <p className="py-5 font-bold">The following accounts will receive SHM immediately at genesis / mainnet launch:</p>
    <li>Foundation account 22.44% of 249M; 55.88M SHM; becomes available at mainnet launch</li>
    <li>Ecosystem & Airdrops account 10.23% of 249M; 25.48M SHM; becomes available at mainnet launch</li>
    <p className="py-5 font-bold ">The following accounts will start receiving SHM 3 months (90 days) after the mainnet launch in 730 daily installments:</p>
    <li>Team account 30.6% of 249M; 76.2M SHM; about 104,383 SHM per day after 90 days</li>
    <li>Sale account 36.72% of 249M; 91.44M SHM; about 125,260 SHM per day after 90 days</li>
    
    <LineChart chartData={chartData}/>

    <p className="py-5">The graph above shows the liquid supply of SHM in the 820 days after network genesis, this encompasses the entire vesting period of the Team and Sale SHM.
    </p>
  </div>);
}
