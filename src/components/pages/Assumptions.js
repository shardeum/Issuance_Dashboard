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
import {ScalingData} from '.././components/ScalingData.js';
import {LinearData} from '.././components/LinearData.js';
import {EthModelData} from '.././components/EthModelData.js';
import {AlgoModelData} from '.././components/AlgoModelData.js';
import ComboChart from ".././components/LineChart2";
import LineChart from ".././components/LineChart3";
import LineChart2 from ".././components/LineChart4";
import ScalingChart from ".././components/ScalingChart";
import SAChart from ".././components/SAChart";
import EthChart from ".././components/EthChart";
import StabilityFactor from ".././components/StabilityFactor";
import TPSCalc from ".././components/TPSCalc";

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


  const [chartData4] = useState({
    labels: ScalingData.map((data) => data.Year),
    datasets: [
 {
        label: 'Reward Scaling',
        data: ScalingData.map((data) => data.Reward),
        yAxisID: 'y',
      }, {

      label: 'Reward Linear',
      data: LinearData.map((data) => data.Reward),
      yAxisID: 'y',
    }


    ]
  });



  const [chartData5] = useState({
    labels: EthModelData.map((data) => data.Day),
    datasets: [
 {
        label: 'Ethereum Model APR %',
        data: EthModelData.map((data) => data.APR_Multi),
        yAxisID: 'y',
      }


    ]
  });


  const [chartData7] = useState({
    labels: EthModelData.map((data) => data.Day),
    datasets: [

      {
             label: 'Algorand Model APR %',
             data: AlgoModelData.map((data) => data.APR_Multi),
             yAxisID: 'y',
           },

    ]
  });




  const [chartData6] = useState({
    labels: EthModelData.map((data) => data.Day),
    datasets: [
 {
        label: 'Ethereum Model Max S:A Ratio',
        data: EthModelData.map((data) => data.Max_SA_Ratio),
        yAxisID: 'y',
      },





    ]
  });



  const [chartData8] = useState({
    labels: EthModelData.map((data) => data.Day),
    datasets: [


      {
             label: 'Algorand Model Max S:A Ratio',
             data: AlgoModelData.map((data) => data.Max_SA_Ratio),
             yAxisID: 'y',
           },



    ]
  });






  return (<div className="App pt-5 sm:pt-0">





    <h2 className="text-lg font-bold">What is the FDAO?</h2>

    <p className="py-5">
      The FDAO stands for Foundation/DAO. When any network is first launched, it starts out a bit centralized and becomes more and more decentralized over time as more community members participate. This was true for Bitcoin, Ethereum and most other networks and will be true for Shardeum as well. In the case of Shardeum we have planned a smooth transition from the Foundation to a DAO. The Shardeum network will always have the features of a DAO from launch, but in order to propose or vote, an account must have more SHM than some threshold amount. Initially only the Foundation will have more SHM than the threshold. Over time the threshold amount will be lowered by voting. This will allow more and more community members to start participating and transitioning control from the Foundation to a DAO.
    </p>


    <h2 className="text-lg font-bold">What is SHM Stable Price?</h2>
    <p className="py-5">
      The Stable Price is simply the average of the recent SHM price. For example the average SHM spot price over the last 5 days. The Stable Price is updated and posted to an account in the Shardeum network once a day and becomes available for the algorithms in the network to use. For example if the node reward is set to $1/hour and the Stable Price is set to $2, then if a node earned $24 it would receive 12 SHM as the reward. Likewise the Stable Price is used to determine the SHM amount for transaction fees and validator staking based on the USD amounts set by the FDAO. This ensures that even if the SHM price is very volatile, the transaction fees, the node reward and staking amounts will be stable in terms of the USD. The Stable Price is posted autonomously by an Oracle, but can be overwritten by the FDAO in case of any failures.




    </p>


      <StabilityFactor/>


    <h2 className="text-lg font-bold">What is the Standby:Active Validator Ratio (S:A Ratio)?</h2>
      <p className="py-5">
      The S:A ratio is the number of standby nodes to the number of active nodes. Nodes in standby are randomly picked to join the network and become active and nodes that were active for a long time are cycled out. This kind of rotation increases decentralization. The S:A ratio being high increases decentralization and makes it hard to execute a majority take over or Sybil attack. It is good for the FDAO to monitor the S:A ratio and increase the node reward in order to increase the ratio. Nodes only earn a reward when they are active. A node can collect the reward after it has been cycled out and is no longer active. Giving a reward to standby nodes <span className="underline">would</span> incentives them to try and collect the reward without actually participating in the network and going active. Thus, standby nodes do not receive a reward.
      </p>
    <h2 className="text-lg font-bold">S:A Ratio - Inclusion Time</h2>
    <p className="py-5">The graph below shows the correlation between the S:A ratio and the percentage of time that a validator will be active (earning node reward $). In principle, a higher S:A ratio will mean validator nodes spend less time actively validating (based on probability).</p>
    <p className="pb-5">For example, if the network had an S:A Ratio of 1:1, then based on math, each node would spend around 50% of the time participating in the network as an active node. If this ratio changed to 2:1, the time as an active validator would reduce to around 33%.</p>
    <ComboChart chartData={chartData}/>
    <h2 className="text-lg font-bold pt-5">S:A Ratio - Monthly Reward</h2>
    <p className="py-5">The graph below highlights the impact of the S:A ratio and Node Reward per Hour $ on Monthly Reward $. As the S:A ratio increases, the network becomes less profitable for the validator nodes; this is because, with a higher S:A ratio, the overall size of the network in terms of validator nodes increases, essentially the same amount of node reward is distributed to a higher number of nodes.</p>
    <p>For example, if the S:A ratio is 1:1 and the network size (active validators) is 1300 with a node reward of 1$ per hour, the total network size would be 2600 (total network size (active + standby nodes)). The reward calculation per hour would be:</p>
    <p className="font-bold py-5">1300 (active validators) * 1$ (node reward per hour) / 2600 (total network size)) = $0.50 (actual node reward per hour)</p>
    <p>With a 2:1 S:A ratio and the network size (active validators) is 1300 with a node reward of 1$ per hour, the total network size would be 3900 (total network size (active + standby nodes)). The reward calculation per hour would be:</p>
    <p className="font-bold py-5">1300 (active validators) * 1$ (node reward per hour) / 3900 (total network size)) = $0.33 (actual node reward per hour)</p>

<LineChart chartData={chartData2}/>
    <h2 className="text-lg font-bold pt-5">S:A Ratio - Network Cost vs Reward (Equilibrium)</h2>
      <p className="py-5">The graph below demonstrates the relationship between the Network Operating Cost $ and Network Reward $. At a targeted APY%, the increased S:A ratio increases the operating cost of the network.</p>
      <p>For example, if the network is targeting node APY at 50% and running a validator node costs $10 (per day). With an S:A ratio of 1:1 and a network size of 1300 nodes (active validators), the total network size would be 2600 (total network size (active + standby nodes)). The network operating cost calculation per day would be:</p>
      <p className="font-bold py-5">2600 (total network size) * (10 ( node operating cost per day) * 50% (target APY)) = $13,000 (network operating cost per day)</p>
      <p>With a 2:1 S:A ratio and a network size of 1300 nodes (active validators), the total network size would be 3900 (total network size (active + standby nodes)). The network operating cost per day would be:</p>
      <p className="font-bold py-5">3900 (total network size) * (10 ( node operating cost per day) * 50% (target APY)) = $19,500 (network operating cost per day)</p>
      <p>When considering Network Reward $, the total reward is based on the target APY% and the Node Reward $/hr. At some point, the Network Operating Cost $ will intersect the Network Reward $; this is the maximum S:A ratio the network can maintain at a target APY%. </p>
        <p className="py-5">The maximum S:A ratio (when network operating cost $ intersects the network Reward $) depends on network variables that the FDAO controls or monitors (see parameters tab).</p>

  <LineChart2 chartData={chartData3}/>





      <h2 className="text-lg font-bold pt-5">Why No Pre-defined Issuance Schedule?</h2>

        <p className="py-5">Shardeum is an EVM-based L1 that uses dynamic state sharding to achieve linear scalability while attaining atomic composability across shards. Shardeum can increase its TPS capacity with each validator added to the network to retain low fees forever.

  This approach to scalability is unique; therefore, how we issue the SHM token must also be unique. Common approaches to tokenomics, such as pre-defined issuance via either linear or scaled distribution, are not fit for purpose. The following section will demonstrate why these methods would unlikely work long-term.</p>

    <h2 className="text-lg font-bold pt-5">Horizontal vs Vertical Scalability</h2>

  <p className="pt-5">The first step in understanding why a new issuance method is required is comprehending how Shardeum scales from a hardware perspective. Because Shardeum increases its network throughput (TPS) by adding additional active validator nodes, it is critical to have these nodes constantly ready to join the network when network traffic (TPS) increases; this is achieved by having a pool of standby nodes at the ready to join when needed. The key is ensuring the network is always profitable enough to maintain enough of these standby nodes without becoming inefficient.</p>

  <p className="pt-5">All non-sharded networks achieve higher throughput (TPS) by scaling vertically; this scaling method increases each nodes CPU, RAM and network resources to increase the network's capacity. Shardeum uses horizontal scaling to increase network throughput (TPS); this approach adds more nodes with similar resources per node and uses parallel processing to increase the network's capacity.</p>

  <p className="pt-5">The calculator below demonstrates that the risk of unstable validator numbers is far higher for a sharded horizontally scaling network like Shardeum; this is because if the network becomes unprofitable for the node operators and validator numbers drop, so does network throughput (TPS), this would result in rejected transactions and could bring the network to a halt. These risks don't apply to non-sharded vertically scaling networks because the lowest performing node determines network throughput (TPS); if validator numbers reduce, the network throughput (TPS) stays the same.  One major drawback of vertical scalability is hardware cost; these networks require high-end equipment to reach high network capacity. This in-tern makes it hard to become a validator and reduces decentralization. </p>

      <TPSCalc/>


        <h2 className="text-lg py-5 font-bold">Linear and Scaling Pre-defined Distribution via Example</h2>

          <p className="pb-5">The traditional approaches to issuance are pre-scheduled scaling or linear issuance. The scaling model used in Bitcoin reduces the block reward (halving) approximately every 4 years in an attempt to offset the increase in bitcoin (BTC) price.

The linear approach is simply issuing a set amount of the network's native asset over a standard period, such as a day, week or year.</p>



    <ScalingChart chartData={chartData4}/>

    <h2 className="text-lg py-5 font-bold">APY% Model Based on Ethereum and Algorand Data</h2>

      <p className="pb-5">
        The graphs below demonstrate how following a pre-defined issuance schedule with a horizontally scaling architecture results in massive fluctuations in APY%. In the bull case (Ethereum), the native asset increases in value rapidly, causing the network to become wildly profitable for node operators and resulting in the network becoming inefficient (delivering a higher APR% than needed).

In the bare case (Alogrand), the price of the native asset decreases, this results in the network becoming unprofitable for node providers (delivering negative APR% returns). The likely outcome would be a massive reduction in node operators; this causes significant problems for horizontally scaling networks, which could mean the network loses its ability to scale (increase TPS).
      </p>


<div className="flex-1 flex-col sm:flex sm:flex-row">





        <EthChart  chartData={chartData5} title={"Ethereum APY% Model (with scaling)"}/>
          <EthChart chartData={chartData7} title={"Algorand APY% Model (with scaling)"}/>


      </div>

          <h2 className="text-lg py-5 font-bold">Maximum Profitable S:A Ratio Based on Pre-defined Issuance</h2>

            <p className="pb-5">
              The above graphs show how pre-defined issuance makes APY% return unpredictable. In reality, in the Shardeum network, APY% would likely always find some form of equilibrium; when the network is more profitable, the network would have a much higher S:A Ratio. Likewise, the S:A Ratio would reduce if the network becomes less profitable.


  The graphs below highlight how depending on native token price action; the network could end up in the bull case (Ethereum) with an S:A ratio that is unnecessarily high and wasteful of computing resources. In the bare case (Algorand), the S:A Ratio could become so low it compromises security and could cause the network to lose its ability to scale (increase TPS).
            </p>

      <div className="flex-1 flex-col sm:flex sm:flex-row">




          <SAChart chartData={chartData6} title={"Ethereum S:A Ratio Model (with scaling)"}/>
          <SAChart chartData={chartData8} title={"Algorand S:A Ratio Model (with scaling)"}/>

  </div>

  </div>);
}
