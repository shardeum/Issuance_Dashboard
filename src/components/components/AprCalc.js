import React from "react";
import RangeSlider from "./assets/range-slider.js";

export default class AprCalc extends React.Component {
  state = {
    SHMperDay: 10000,
    SHMperMonth: 300000,
    NetworkSize: 1200,
    TotalNetworkSize: 2400,
    ValidatorCost: 100,
    SHMValue: 0.85,
    ASRatio: 1,
    Stake: 100,
    ApproxTimeValidating: 50,
    RewardDay: 4.17,
    RewardMonth: 125.0,
    ProfitDay: 0.21,
    ProfitMonth: 6.25,
    Apr: 75
  };

  onRatioChange = (event) => {
    this.setState({
      ASRatio: event.target.value
    }, () => this.updateTotalNetwork());
  };

  updateTotalNetwork = (event) => {
    this.setState({
      TotalNetworkSize: this.state.NetworkSize * this.state.ASRatio + parseInt(this.state.NetworkSize)
    }, () => this.updateApproxValidating());
  };

  updateApproxValidating = (event) => {
    this.setState({
      ApproxTimeValidating: (this.state.NetworkSize / this.state.TotalNetworkSize) * 100
    }, () => this.updateReward());
  };

  onValidatorCostChange = (event) => {
    this.setState({
      ValidatorCost: event.target.value
    }, () => this.updateReward());
  };

  onPriceChange = (event) => {
    this.setState({
      SHMValue: event.target.value
    }, () => this.updateReward());
  };

  onIssuanceChange = (event) => {
    this.setState({
      SHMperDay: event.target.value
    }, () => this.updateReward());
    this.setState({
      SHMperMonth: event.target.value * 30
    });
  };

  onNodeChange = (event) => {
    this.setState({
      NetworkSize: event.target.value
    }, () => this.updateTotalNetwork());
  };

  onStakeChange = (event) => {
    this.setState({
      Stake: event.target.value
    }, () => this.updateReward());
  };

  updateReward = (event) => {
    this.setState({
      RewardDay: ((this.state.SHMperDay / this.state.NetworkSize) * this.state.ApproxTimeValidating) / 100
    });
    this.setState({
      RewardMonth: ((this.state.SHMperMonth / this.state.NetworkSize) * this.state.ApproxTimeValidating) / 100
    }, () => this.CalcProfit());
  };

  CalcProfit = (event) => {
    this.setState({
      ProfitDay: this.state.RewardDay * this.state.SHMValue - this.state.ValidatorCost / 30
    });
    this.setState({
      ProfitMonth: this.state.RewardMonth * this.state.SHMValue - this.state.ValidatorCost
    }, () => this.calcApr());
  };
  calcApr = (event) => {
    this.setState({
      Apr: ((this.state.ProfitMonth * 12) / this.state.Stake) * 100
    });
  };

  render() {
    return (<> <div className="flex flex-wrap"> <div className="flex-1 w-50">
      <div className="flex-col">
        <div className="form-control min-h-200">
          <label className="label">
            <span className="label-text">SHM Issued per Day</span>
          </label>
          <div className="tooltip" data-tip="Enter SHM issed per day">
            <label className="input-group">
              <span>SHM</span>
              <input type="text" value={this.state.SHMperDay} className="input input-bordered" onChange={this.onIssuanceChange}/>
              <span>Day</span>
            </label>
          </div>
        </div>

        <div className="stats stats-vertical sm:stats-horizontal shadow min-h-200">
          <div className="stat">
            <div className="stat-title">Approx SHM Issued per Month</div>
            <div className="stat-value">{this.state.SHMperDay * 30}
              SHM</div>
            <div className="stat-desc">**based on a 30 day month</div>
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

        <RangeSlider title={"Standby:Active Validator Ratio"} desc={" S:A Ratio:"} max={20} start={1} onSliderChange={this.onRatioChange}/>

        <RangeSlider title={"Total Node Running Cost(monthly)"} desc={" USD"} max={1000} start={100} onSliderChange={this.onValidatorCostChange}/>

      </div>
    </div>
    <div className="flex-1 w-50">
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
    <div className="flex-1 min-w-full apr-stats">
      <div className="stats stats-vertical sm:stats-horizontal shadow">
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

      <div className="stats stats-vertical sm:stats-horizontal shadow">
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

      <div className="stats stats-vertical sm:stats-horizontal shadow">
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

      <div className="stats stats-vertical sm:stats-horizontal shadow">
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

      <div className="stats stats-vertical sm:stats-horizontal shadow">
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

      <div className="stats stats-vertical sm:stats-horizontal shadow">
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
