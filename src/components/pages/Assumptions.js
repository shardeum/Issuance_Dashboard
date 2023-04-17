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
import StabilityFactor from ".././components/StabilityFactor";

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
        yAxisID: 'y1'
      }, {
        label: 'Time Spent Validating %',
        data: InclusionData.map((data) => data.Time_Validating),
        type: 'line',
        order: 0,
        yAxisID: 'y'
      }
    ]
  });

  const [chartData2] = useState({
    labels: MonthlySHMData.map((data) => data.VSRatio),
    datasets: [
      {
        label: "$0.25",
        data: MonthlySHMData.map((data) => data.example1)
      }, {
        label: "$0.50",
        data: MonthlySHMData.map((data) => data.example2)
      }, {
        label: "$0.75",
        data: MonthlySHMData.map((data) => data.example3)
      }, {
        label: "$1.00",
        data: MonthlySHMData.map((data) => data.example4)
      }, {
        label: "$1.25",
        data: MonthlySHMData.map((data) => data.example5)
      }, {
        label: "$1.50",
        data: MonthlySHMData.map((data) => data.example6)
      }, {
        label: "$1.75",
        data: MonthlySHMData.map((data) => data.example7)
      }, {
        label: "$2.00",
        data: MonthlySHMData.map((data) => data.example8)
      }
    ]
  });

  const [chartData3] = useState({
    labels: NetworkData.map((data) => data.VSRatio),
    datasets: [
      {
        label: 'Network Cost $',
        data: NetworkData.map((data) => data.NetworkCost),
        yAxisID: 'y'
      }, {
        label: 'Network Reward $',
        data: RewardData.map((data) => data.SHMPrice),
        yAxisID: 'y1',
      },


    ]
  });

  return (<div className="App pt-5">





    <h2 className="text-lg font-bold">What is the FDAO?</h2>

    <p className="py-5">
      The FDAO stands for Foundation/DAO. When any network is first launch, it starts out a bit centralized and becomes more and more decentralized over time as more community members participate. This was true for Bitcoin, Ethereum and most other networks and will be true for Shardeum as well. In the case of Shardeum we have planned a smooth transition from the Foundation to a DAO. The Shardeum network will always have the features of DAO from launch, but in order to propose or vote, an account must have more SHM than some threshold amount. Initially only the Foundation will have more SHM than the threshold. Over time the threshold amount will be lowered by voting. This will allow more and more community members to start participating and transitioning control from the Foundation to a DAO.
    </p>


    <h2 className="text-lg font-bold">What is the Stability Factor / Stable Price?</h2>
    <p className="py-5">
      The Stable Price is simply the average of the recent SHM price. For example the average SHM spot price over the last 5 days. The Stable Price and Stability Factor are updated and posted to an account in the Shardeum network once a day and becomes available for the algorithms in the network to use. For example if the node reward is set to $1/hour and the SF is set to 2, then if a node earned $24 it would receive 12 SHM as the reward. Likewise the SF is used to determine the SHM amount for transaction fees and validator staking based on the USD amounts set by the FDAO. This ensures that even if the SHM price is very volatile, the transaction fees, the node reward and staking amounts will be stable in terms of the USD.




    </p>


      <StabilityFactor/>


    <h2 className="text-lg font-bold">What is the Standby:Active Vaidator Ratio (S:A Ratio)?</h2>
      <p className="py-5">
        Add copy from Omar
      </p>
    <h2 className="text-lg font-bold">S:A Ratio - Inclusion Time</h2>
    <p className="py-5">Dan to write</p>
    <ComboChart chartData={chartData}/>
    <h2 className="text-lg font-bold">S:A Ratio - Monthly Reward</h2>
    <p className="py-5">Dan to write</p>
    <LineChart chartData={chartData2}/>
    <h2 className="text-lg font-bold">S:A Ratio - Network Cost vs Reward (Equilibrium)</h2>
    <p className="py-5">Dan to write</p>
    <LineChart2 chartData={chartData3}/>





      <h2 className="text-lg font-bold">Why No Pre-defined Issuance Schedule?</h2>
        <p className="py-5 font-bold">
          Show Linear and Scaling Issuance Models
        </p>
        <p className="py-5 font-bold">
          Importance of Controllable Issuance - Vertical vs Horizontal Networks
        </p>

        <p className="py-5 font-bold">
          Maximum Profitable S:A Ratio Based on Pre-defined Issuance
        </p>


  </div>);
}
