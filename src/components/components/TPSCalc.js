import React from "react";
import RangeSlider from "./assets/range-slider.js";

export default class TPSCalc extends React.Component {
  state = {
    SliderValue1:1300,
    ActiveValidatorsShardeum: 1300,
    ActiveValidatorsNonSharded: 1300,
    ShardeumTPS: 22,
    NonShardedTPS: 22,
    TPSPerNode: 2,
    NodesPerShard: 120,
    LowestPerformingNode:22
  };




  onSliderChange = (event) => {
    this.setState({
      ActiveValidatorsShardeum: event.target.value
    }, () => this.onUpdate());
  };



  onSliderChange2 = (event) => {
    this.setState({
      ActiveValidatorsNonSharded: event.target.value

    }, () => this.onUpdate());
  };

     onUpdate = (event) => {




       this.setState({

           TPSPerNode: document.getElementById('TPSPerNode').value,
           NodesPerShard: document.getElementById('NodesPerShard').value,
           LowestPerformingNode: document.getElementById('LowestPerformingNode').value
        }, () => this.UpdateTPS());
     };



     UpdateTPS = (event) => {

       this.setState({
           ShardeumTPS: this.state.TPSPerNode * this.state.ActiveValidatorsShardeum / this.state.NodesPerShard,
           NonShardedTPS: this.state.LowestPerformingNode,
        });
     };









  render() {
    return (<>

      <div className="flex-1 flex-wrap flex py-5  flex-row">
        <div className="flex-1 flex flex-col flex-wrap justify-start StabilityFactor w-full md:w-auto">


          <h2 className="text-lg font-bold pb-5">Sharded Network TPS calculation (horizontal scaling)</h2>
          <div className="form-control min-h-200">
            <RangeSlider title={"Active Validator Nodes"} id="ActiveValidatorsShardeum" desc={"Active Nodes"} max={100000} start={1300} onSliderChange={this.onSliderChange}/>
          </div>


          <div className="form-control min-h-200">
            <label className="label">
              <span className="label-text">Nodes per Shard</span>
            </label>
            <div className="tooltip" data-tip="Determines security and redundancy of the network">
              <label className="input-group">
                <input type="text" value={this.state.NodesPerShard} id="NodesPerShard" className="input input-bordered" onChange={this.onUpdate}/>
                <span>Nodes</span>
              </label>
            </div>
          </div>


          <div className="form-control min-h-200">
            <label className="label">
              <span className="label-text">Node TPS #/s</span>
            </label>
            <div className="tooltip" data-tip="Cool TPS per node; about 20% of Max TPS; node can easily handle this TPS.">
              <label className="input-group">
                <input type="text" value={this.state.TPSPerNode} id="TPSPerNode" className="input input-bordered" onChange={this.onUpdate}/>
                <span>TPS</span>
              </label>
            </div>
          </div>





                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Network TPS</div>
                    <div className="stat-value">
                      {this.state.ShardeumTPS.toFixed(0)}
                    </div>
                    <div className="stat-desc">
                      Network TPS = TPS per Node * Number of Nodes / Nodes per Shard
                    </div>
                  </div>
                </div>






    </div>


    <div className="flex-1 flex flex-col flex-wrap justify-start StabilityFactor w-full md:w-auto">


      <h2 className="text-lg font-bold pb-5">Non-Sharded Network TPS calculation (vertical scaling)</h2>
      <div className="form-control min-h-200">
        <RangeSlider title={"Active Validator Nodes"} id="ActiveValidatorsNonSharded" desc={"Active Nodes"} max={100000} start={1300} onSliderChange={this.onSliderChange2}/>
      </div>




      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Lowest Performing Node TPS #/s</span>
        </label>
        <div className="tooltip" data-tip="Cool TPS per node; about 20% of Max TPS; node can easily handle this TPS.">
          <label className="input-group">
            <input type="text" value={this.state.LowestPerformingNode} id="LowestPerformingNode" className="input input-bordered" onChange={this.onUpdate}/>
            <span>TPS</span>
          </label>
        </div>
      </div>



            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Network TPS</div>
                <div className="stat-value">
                  {this.state.NonShardedTPS}
                </div>
                <div className="stat-desc">
                  Network TPS = TPS of Lowest Performing Node
                </div>
              </div>
            </div>






</div>










</div>


      </ >);
  }
}
