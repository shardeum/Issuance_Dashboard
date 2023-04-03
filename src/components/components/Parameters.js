import React from "react";
import RangeSlider from "./assets/range-slider.js";

export default class AprCalc extends React.Component {
  state = {
    NodeTPS: 10,
    Nodes: 600,
    NodesPerShard: 120,
    NetworkTPS: 50,
    TotalNetworkSize: 2400,
    ValidatorCost: 100,
    SHMValue: 0.85,
    ASRatio: 14,
    Stake: 100,
    ApproxTimeValidating: 50,
    RewardDay: 4.17,
    RewardMonth: 125.0,
    ProfitDay: 0.21,
    ProfitMonth: 6.25,
    Apr: 75
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
    })
  };



  render() {
    return (<> < div class = "flex flex-wrap" > <div class="flex-1 w-50">
      <div className="flex-col">
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
              <input type="text" value={this.state.Nodes} className="input input-bordered" onChange={this.onNodesChange}/>
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
            <div className="stat-value">{this.state.NetworkTPS }
               TPS</div>
            <div className="stat-desc">The total TPS of the network. Network TPS = Node TPS * Nodes / Nodes/Shard</div>
          </div>
        </div>

        <div className="form-control min-h-200">
          <label className="label">
            <span className="label-text">SHM Value $</span>
          </label>
          <div className="tooltip" data-tip="Enter SHM issed per day">
            <label className="input-group">
              <span>Price</span>
              <input type="text" value={this.state.SHMValue} className="input input-bordered" onChange={this.onPriceChange}/>
              <span>USD</span>
            </label>
          </div>
        </div>

        <RangeSlider title={"Active:Standby Validator Ratio"} desc={" A:S Ratio:"} max={20} start={1} onSliderChange={this.onRatioChange}/>

        <RangeSlider title={"Total Node Running Cost(monthly)"} desc={" USD"} max={1000} start={100} onSliderChange={this.onValidatorCostChange}/>

      </div>
    </div>
    <div class="flex-1 w-50">
      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Network Size(active)</span>
        </label>
        <div className="tooltip" data-tip="Number of active validators">
          <label className="input-group">
            <input type="text" value={this.state.NetworkSize} className="input input-bordered" onChange={this.onNodeChange}/>
            <span>Nodes</span>
          </label>
        </div>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Network Size(total)</span>
        </label>
        <label className="input-group">
          <input type="text" value={this.state.TotalNetworkSize} className="input input-bordered" onChange={this.onASRatioChange} disabled="disabled"/>
          <span>Nodes</span>
        </label>
      </div>

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Stake</span>
        </label>
        <div className="tooltip" data-tip="Stake required to run node">
          <label className="input-group">
            <input type="text" value={this.state.Stake} className="input input-bordered" onChange={this.onStakeChange}/>
            <span>USD</span>
          </label>
        </div>
      </div>
    </div>
    <div class="flex-1 min-w-full apr-stats">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Approx Time Validating</div>
          <div className="stat-value">
            {this.state.ApproxTimeValidating.toFixed(0)}%
          </div>
          <div className="stat-desc">
            **based on math only, not real world scenario
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">SHM per Day</div>
          <div className="stat-value">
            {this.state.RewardDay.toFixed(0)}
            SHM
          </div>
          <div className="stat-desc">
            **based on math only, not real world scenario
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">SHM per Month</div>
          <div className="stat-value">
            {this.state.RewardMonth.toFixed(0)}
            SHM
          </div>
          <div className="stat-desc">
            **based on math only, not real world scenario
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Return Day</div>
          <div className="stat-value">
            {this.state.ProfitDay.toFixed(0)}
            USD
          </div>
          <div className="stat-desc">
            **based on math only, not real world scenario
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Return Month</div>
          <div className="stat-value">
            {this.state.ProfitMonth.toFixed(0)}
            USD
          </div>
          <div className="stat-desc">
            **based on math only, not real world scenario
          </div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">APR</div>
          <div className="stat-value">{this.state.Apr.toFixed(0)}%</div>
          <div className="stat-desc">
            **based on math only, not real world scenario
          </div>
        </div>
      </div>
    </div> < /div>
      </ >);
  }
}
