import React from "react";


export default class AprCalc extends React.Component {
  state = {
    NodeTPS: 10,
    Nodes: 600,
    NodesPerShard: 120,
    NetworkTPS: 50,
    TXfees: 0.01,
    NodeRewardPerHour: 0.5,
    Stake: 1000,
    StabilityFactor: 1.2,
    SHMValue: 2,
    AvgTxFee: 0,
    ActiveNodes: 0,
    SeverRentPerHour: 0.2,
    TPSPerNode: 2,
    SHMSupply: 259080000,
    StandbyRatio: 0,
    RevenuePerDay: 0,
    ExpensePerDay: 0,
    IncomePerDay: 0,
    APYPerYear: 0,
    MarketAPY: 10,
    NetworkRevenuePerDay: 0,
    NetworkExpensePerDay: 0,
    NetworkIncomePerDay: 0,
    NetworkDeltaPerDay: 0,
    MinNodes: 600
  };

  componentDidMount() {
    this.setState({
      NetworkTPS: this.state.NodeTPS * this.state.Nodes / this.state.NodesPerShard,
      AvgTxFee: this.state.TXfees * 2,
      ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
      StandbyRatio: this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1
    }, () => this.updateIncome());
  };

  onNodeTPSChange = (event) => {
    this.setState({
      NodeTPS: event.target.value
    }, () => this.updateNetworkTPS());
  };

  onNodesChange = (event) => {
    this.setState({
      Nodes: event.target.value
    }, () => this.updateNetworkTPS());
  };

  onNodesPerShardChange = (event) => {
    this.setState({
      NodesPerShard: event.target.value
    }, () => this.updateNetworkTPS());
  };

  updateNetworkTPS = (event) => {
    this.setState({
      NetworkTPS: this.state.NodeTPS * this.state.Nodes / this.state.NodesPerShard
    }, () => this.updateMonitoring());
  };

  onTXfeesChange = (event) => {
    this.setState({
      TXfees: event.target.value
    }, () => this.updateMonitoring());

  };

  onNodeRewardPerHourChange = (event) => {
    this.setState({
      NodeRewardPerHour: event.target.value
    }, () => this.updateMonitoring());

  };

  onStakeChange = (event) => {
    this.setState({
      Stake: event.target.value
    }, () => this.updateMonitoring());

  };

  onStabilityFactorChange = (event) => {
    this.setState({
      StabilityFactor: event.target.value
    }, () => this.updateMonitoring());

  };

  onMinNodesChange = (event) => {
    this.setState({
      MinNodes: event.target.value
    }, () => this.updateMonitoring());

  };

  updateMonitoring = (event) => {

    if (this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard >= this.state.MinNodes) {
      this.setState({
        NetworkTPS: this.state.NodeTPS * this.state.Nodes / this.state.NodesPerShard,
        AvgTxFee: this.state.TXfees * 2,
        ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
        StandbyRatio: this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1
      }, () => this.updateIncome());
    } else {
      console.log("2")
      this.setState({
        NetworkTPS: this.state.NodeTPS * this.state.Nodes / this.state.NodesPerShard,
        AvgTxFee: this.state.TXfees * 2,
        ActiveNodes: this.state.MinNodes,
        StandbyRatio: this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1
      }, () => this.updateIncome());
    }
  };

  onSHMValueChange = (event) => {
    this.setState({
      SHMValue: event.target.value
    }, () => this.updateMonitoring());

  };

  onAvgTxFeeChange = (event) => {
    this.setState({
      AvgTxFee: event.target.value
    }, () => this.updateMonitoring());

  };

  onNetworkTPSChange = (event) => {
    this.setState({
      NetworkTPS: event.target.value
    }, () => this.updateMonitoring());

  };

  onActiveNodesChange = (event) => {
    this.setState({
      ActiveNodes: event.target.value
    }, () => this.updateMonitoring());

  };

  onStandbyRatioChange = (event) => {
    this.setState({
      StandbyRatio: event.target.value
    }, () => this.updateMonitoring());
  };

  onSeverRentPerHourChange = (event) => {
    this.setState({
      SeverRentPerHour: event.target.value
    }, () => this.updateMonitoring());

  };

  onTPSPerNodeChange = (event) => {
    this.setState({
      TPSPerNode: event.target.value
    }, () => this.updateMonitoring());

  };

  onSHMSupplyChange = (event) => {
    this.setState({
      SHMSupply: event.target.value
    }, () => this.updateMonitoring());

  };

  onMarketAPYChange = (event) => {
    this.setState({
      MarketAPY: event.target.value
    }, () => this.updateMonitoring());

  };

  updateIncome = (event) => {

    console.log("NodeRewardPerHour: " + this.state.NodeRewardPerHour)
    console.log("StandbyRatio: " + this.state.StandbyRatio)

    this.setState({

      RevenuePerDay: this.state.NodeRewardPerHour * 24 / (this.state.StandbyRatio + 1),
      ExpensePerDay: this.state.SeverRentPerHour * 24,
      NetworkRevenuePerDay: this.state.NetworkTPS * 86400 * this.state.AvgTxFee,
      NetworkExpensePerDay: this.state.ActiveNodes * this.state.NodeRewardPerHour * 24,
      NetworkDeltaPerDay: this.state.NetworkIncomePerDay / this.state.StabilityFactor,
      AvgTxFee: this.state.TXfees * 2,
      StandbyRatio: this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1
    }, () => this.updateIncomeDay());
  };

  updateIncomeDay = (event) => {
    this.setState({
      NetworkIncomePerDay: this.state.NetworkRevenuePerDay - this.state.NetworkExpensePerDay,
      IncomePerDay: this.state.RevenuePerDay - this.state.ExpensePerDay
    }, () => this.updateAPY());
  };

  updateAPY = (event) => {
    this.setState({
      NetworkDeltaPerDay: this.state.NetworkIncomePerDay / this.state.StabilityFactor,
      APYPerYear: 100 * this.state.IncomePerDay * 365 / this.state.Stake
    })
  };

  render() {
    return (<> < div class = "flex flex-wrap" > <div class="flex-1 w-50">
      <div className="flex-col">
        <h2>Network</h2>
        <div className="form-control min-h-200">
          <label className="label">
            <span className="label-text">Node TPS</span>
          </label>
          <div className="tooltip" data-tip="Max TPS a node can do; we try to run the nodes at 1/5 of this speed.">
            <label className="input-group">
              <input type="text" value={this.state.NodeTPS} className="input input-bordered" onChange={this.onNodeTPSChange}/>
              <span>TPS</span>
            </label>
          </div>
        </div>

        <div className="form-control min-h-200">
          <label className="label">
            <span className="label-text">Nodes</span>
          </label>
          <div className="tooltip" data-tip="Number of active nodes in network">
            <label className="input-group">
              <input type="text" value={this.state.Nodes} min={this.state.MinNodes} className="input input-bordered" onChange={this.onNodesChange}/>
              <span>Nodes</span>
            </label>
          </div>
        </div>

        <div className="form-control min-h-200">
          <label className="label">
            <span className="label-text">Nodes per Shard</span>
          </label>
          <div className="tooltip" data-tip="Determines security and redundancy of the network">
            <label className="input-group">
              <input type="text" value={this.state.NodesPerShard} className="input input-bordered" onChange={this.onNodesPerShardChange}/>
              <span>Nodes</span>
            </label>
          </div>
        </div>

        <div className="stats shadow min-h-200">
          <div className="stat">
            <div className="stat-title">Network Throughput</div>
            <div className="stat-value">{this.state.NetworkTPS}
              TPS</div>
            <div className="stat-desc">The total TPS of the network. Network TPS = Node TPS * Nodes / Nodes/Shard</div>
          </div>
        </div>

      </div>
    </div>
    <div class="flex-1 w-50">
      <h2>FDAO Controls</h2>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Tx Fee $</span>
        </label>
        <div className="tooltip" data-tip="This is the target fee for a token transfer transaction. SHM transfer will be less; AMM txs will be more.">
          <label className="input-group">
            <input type="text" value={this.state.TXfees} className="input input-bordered" onChange={this.onTXfeesChange}/>
            <span>USD</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Node Reward $/hr</span>
        </label>
        <div className="tooltip" data-tip="This defines how much each active node in the network receives as dollars per hour. Although it is specified in $ it is paid out in SHM.">
          <label className="input-group">
            <input type="text" value={this.state.NodeRewardPerHour} className="input input-bordered" onChange={this.onNodeRewardPerHourChange}/>
            <span>USD</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Stake Amount $</span>
        </label>
        <div className="tooltip" data-tip="The amount of SHM a node must stake in order to join the network. Specified in $ but staked in SHM based on price set by Stability factor. Some or all of the stake can be lost if node misbehaves or falls behind in processing. This ensures that operators run nodes on good hardware.">
          <label className="input-group">
            <input type="text" value={this.state.Stake} className="input input-bordered" onChange={this.onStakeChange}/>
            <span>USD</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Stability Factor $/SHM</span>
        </label>
        <div className="tooltip" data-tip="Same as SHM price, but set by FDAO into network. Updated about once a day. Used by the network to determine the SHM amount for target Tx Fee, Node reward and Stake amount.">
          <label className="input-group">
            <input type="text" value={this.state.StabilityFactor} className="input input-bordered" onChange={this.onStabilityFactorChange}/>

          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Nodes per Shard</span>
        </label>
        <div className="tooltip" data-tip="Determines the level of security and redundancy; higher is more secure and redundant; Ethereum research suggest 100 to 300; Ethereum is using 128. This will probably never change.">
          <label className="input-group">
            <input type="text" value={this.state.NodesPerShard} disabled="disabled" className="input input-bordered"/>
            <span>Nodes</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Min Nodes</span>
        </label>
        <div className="tooltip" data-tip="This is the minimum number of nodes the network must have regardless of how low the TPS is. This is needed in order to maintain a certain level of decentralization.">
          <label className="input-group">
            <input type="text" value={this.state.MinNodes} className="input input-bordered" onChange={this.onMinNodesChange}/>
            <span>Nodes</span>
          </label>
        </div>
      </div>

    </div>

    <div class="flex-1 w-50 apr-stats">
      <h2 className="pt-10">FDAO Monitoring</h2>
      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">SHM Value $</span>
        </label>
        <div className="tooltip" data-tip="FDAO uses this to set the Stability Factor. Stability factor changed about once a day.">
          <label className="input-group">
            <span>Price</span>
            <input type="text" value={this.state.SHMValue} className="input input-bordered" onChange={this.onSHMValueChange}/>
            <span>USD</span>
          </label>
        </div>

      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Average Tx Fee $</span>
        </label>
        <div className="tooltip" data-tip="This is the actual average tx fees on the network. Typically will be more than the target Tx Fee set by FDAO. Maybe about 2x the target Tx Fee.">
          <label className="input-group">
            <input type="text" value={this.state.AvgTxFee} className="input input-bordered" disabled="disabled" onChange={this.onAvgTxFeeChange}/>
            <span>USD</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Network TPS</span>
        </label>
        <div className="tooltip" data-tip="This is the actual TPS of the network. On BSC and Polygon this is about 40 TPS.">
          <label className="input-group">
            <input type="text" value={this.state.NetworkTPS} className="input input-bordered" disabled="disabled" onChange={this.onNetworkTPSChange}/>
            <span>TPS</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Active Nodes</span>
        </label>
        <div className="tooltip" data-tip="This is the actual number of nodes the network needs to process the Network TPS. There is a minimum number of nodes the network must have. Network TPS / Node TPS * Nodes/shard or min of 600 nodes">
          <label className="input-group">
            <input type="text" value={this.state.ActiveNodes} className="input input-bordered" disabled="disabled" onChange={this.onActiveNodesChange}/>
            <span>Nodes</span>
          </label>
        </div>
      </div>

    </div>

    <div class="flex-1 w-50 apr-stats">
      <h2 className="pt-10">Continued...</h2>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Standby Ratio #</span>
        </label>
        <div className="tooltip" data-tip="Standby  / Active
Increasing the node reward will increase this.
Will probably increase until the APY is about 10%.

Standby ratio = Node reward x 24 /
                            (10 x Stake amount / 365 x 100 +
                                 Server rent x 24)

If Standby ratio < 1 then set it to 1
">
          <label className="input-group">
            <input type="text" value={this.state.StandbyRatio.toFixed(2)} className="input input-bordered" disabled="disabled" onChange={this.onStandbyRatioChange}/>
            <span>S:A</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Sever Rent $/hr</span>
        </label>
        <div className="tooltip" data-tip="On Linode.com $0.20/hr gets
8 core
16 GB RAM
320 GB SSD
6 TB/mo transfer
40 Gbs download / 6 Gbs upload">
          <label className="input-group">
            <input type="text" value={this.state.SeverRentPerHour} className="input input-bordered" onChange={this.onSeverRentPerHourChange}/>
            <span>USD</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Node TPS #/s</span>
        </label>
        <div className="tooltip" data-tip="On Linode.com $0.20/hr gets
8 core
16 GB RAM
320 GB SSD
6 TB/mo transfer
40 Gbs download / 6 Gbs upload">
          <label className="input-group">
            <input type="text" value={this.state.TPSPerNode} className="input input-bordered" onChange={this.onTPSPerNodeChange}/>
            <span>TPS</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">SHM Supply #</span>
        </label>
        <div className="tooltip" data-tip="Supply is used to guide decisions on the parameters the FDAO sets.
Must keep this below 259080000 SHM. It can go up and down based on Network Income.
SHM Supply = SHM Supply - SHM Delta">
          <label className="input-group">
            <input type="text" value={this.state.SHMSupply} className="input input-bordered" disabled="disabled" onChange={this.onSHMSupplyChange}/>
            <span>SHM</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Market APY</span>
        </label>
        <div className="tooltip" data-tip="This represents what current market APY is for other investments options. For example putting money into a CD or bond. Node operators will look at this and compare it to the APY they can earn by running a node. The number of nodes in standby will adjust so that the APY for running a node will get close to this market APY.">
          <label className="input-group">
            <input type="text" value={this.state.MarketAPY} className="input input-bordered" onChange={this.onMarketAPYChange}/>
            <span>%</span>
          </label>
        </div>
      </div>

    </div>
    <div class="flex-1 min-w-full apr-stats">
      <h2 className="pt-10">Node Income</h2>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Revenue $/day</div>
          <div className="stat-value">
            {"$" + this.state.RevenuePerDay.toFixed(2)}
          </div>
          <div className="stat-desc">
            Node reward * 24 / Standby ratio
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Expense $/day</div>
          <div className="stat-value">
            {"$" + this.state.ExpensePerDay.toFixed(2)}
          </div>
          <div className="stat-desc">
            Expense $/day
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Income $/day</div>
          <div className="stat-value">
            {"$" + this.state.IncomePerDay.toFixed(2)}
          </div>
          <div className="stat-desc">
            Income = Revenue - Expense
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">APY %/year</div>
          <div className="stat-value">
            {this.state.APYPerYear.toFixed(2) + "%"}
          </div>
          <div className="stat-desc">
            100 * Income * 365 / Stake amount
          </div>
        </div>
      </div>

    </div>

    <div class="flex-1 min-w-full">
      <h2 className="pt-10">Network Income</h2>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Revenue $/day</div>
          <div className="stat-value">
            {"$" + this.state.NetworkRevenuePerDay.toFixed(0)}
          </div>
          <div className="stat-desc">
            Daily tx volume * Tx fee
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Expense $/day</div>
          <div className="stat-value">
            {"$" + this.state.NetworkExpensePerDay.toFixed(0)}
          </div>
          <div className="stat-desc">
            Active nodes * Node reward * 24
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Income $/day</div>
          <div className="stat-value">
            {"$" + this.state.NetworkIncomePerDay.toFixed(0)}
          </div>
          <div className="stat-desc">
            Income = Revenue - Expense
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">SHM Delta SHM/day</div>
          <div className="stat-value">
            {this.state.NetworkDeltaPerDay.toFixed(0) + "SHM"}
          </div>
          <div className="stat-desc">
            SHM Delta = Income / Stability factor
          </div>
        </div>
      </div>

    </div>

    < /div></ >);
  }
}
