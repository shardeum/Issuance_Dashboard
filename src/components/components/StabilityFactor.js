import React from "react";

export default class StabilityFactor extends React.Component {
  state = {
    SHMGenPrice: 1,
    SHMStablePrice: 2,
    StakeReqSHM: 500,
    StakeReqUSD: 1000,
    TargetTxFee: 0.01,
    StabilityFactor: 0.5,
    TxFeeSHM: 0.005000,
    TxFeeUSD: 0.01,

  };




   onUpdate = (event) => {

     this.setState({
         SHMGenPrice: document.getElementById('SHMGenPrice').value
     });


     this.setState({
         TargetTxFee: document.getElementById('TargetTxFee').value
     });

     this.setState({
         StakeReqUSD: document.getElementById('StakeReqUSD').value
     });




     this.setState({
         SHMStablePrice: document.getElementById('SHMStablePrice').value
     }, () => this.UpdateStability());
   };


   UpdateStability = (event) => {

     this.setState({
         StabilityFactor: this.state.SHMGenPrice / this.state.SHMStablePrice
      }, () => this.UpdateSHMFees());
   }


   UpdateSHMFees = (event) => {

     this.setState({
         TxFeeSHM: (this.state.SHMGenPrice / this.state.SHMStablePrice) * this.state.TargetTxFee
  }, () => this.UpdateUSDFees());
   }


   UpdateUSDFees = (event) => {

     this.setState({
         TxFeeUSD: this.state.TxFeeSHM * this.state.SHMStablePrice
     });

     this.setState({
         StakeReqSHM: this.state.StakeReqUSD * this.state.StabilityFactor
     });
   }




  render() {
    return (<>

      <div className="flex-1 flex-wrap flex py-5  flex-row">
        <div className="flex flex-1 flex-wrap justify-start StabilityFactor ">


          <div className="form-control min-h-200">
            <label className="label">
              <span className="label-text">SHM Genesis Price $</span>
            </label>
            <div className="tooltip" data-tip="Price of SHM in $ at network genesis">
              <label className="input-group">
                <input type="text" value={this.state.SHMGenPrice} className="input input-bordered" id="SHMGenPrice" onChange={this.onUpdate}/>
                <span>USD</span>
              </label>
            </div>
          </div>


          <div className="form-control min-h-200">
            <label className="label">
              <span className="label-text">Stable Price $</span>
            </label>
            <div className="tooltip" data-tip="Same as SHM price, but set by FDAO into network. Updated about once a day. Used by the network to determine the SHM amount for target Tx Fee, Node reward and Stake amount.">
              <label className="input-group">
                <input type="text" value={this.state.SHMStablePrice} className="input input-bordered" id="SHMStablePrice"  onChange={this.onUpdate}/>
                    <span>USD</span>
              </label>
            </div>
          </div>


                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Stability Factor</div>
                    <div className="stat-value">
                      {this.state.StabilityFactor.toFixed(2)}
                    </div>
                    <div className="stat-desc">
                      SHM Price (genesis) / SHM Stable Price
                    </div>
                  </div>
                </div>

                  </div>


                  <div className="flex flex-1 flex-wrap justify-start StabilityFactor">
                <div className="form-control min-h-200">
                  <label className="label">
                    <span className="label-text">Target Tx Fee $</span>
                  </label>
                  <div className="tooltip" data-tip="This is the target fee for a token transfer transaction. SHM transfer will be less; AMM txs will be more.">
                    <label className="input-group">
                      <input type="text" value={this.state.TargetTxFee} className="input input-bordered" id="TargetTxFee" onChange={this.onUpdate}/>
                      <span>USD</span>
                    </label>
                  </div>
                </div>


                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Final TX Fee (SHM)</div>
                    <div className="stat-value">
                      {this.state.TxFeeSHM.toFixed(6)}
                    </div>
                    <div className="stat-desc">
                      Target TX Fee / SHM Price * Stability Factor
                    </div>
                  </div>
                </div>



                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Final TX Fee (USD)</div>
                    <div className="stat-value">
                      {this.state.TxFeeUSD.toFixed(2)}
                    </div>
                    <div className="stat-desc">
                      TX Fee (SHM) * SHM Stable Price
                    </div>
                  </div>
                </div>




    </div>


    <div className="flex flex-col flex-wrap justify-start StabilityFactor w-full md:w-auto">
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Required Stake $</span>
    </label>
    <div className="tooltip" data-tip="The amount of SHM a node must stake in order to join the network. Specified in $ but staked in SHM based on price set by Stability factor. Some or all of the stake can be lost if node misbehaves or falls behind in processing. This ensures that operators run nodes on good hardware.">
      <label className="input-group">
        <input type="text" value={this.state.StakeReqUSD} className="input input-bordered" id="StakeReqUSD" onChange={this.onUpdate}/>
        <span>USD</span>
      </label>
    </div>
  </div>


  <div className="stats shadow">
    <div className="stat">
      <div className="stat-title">Required Stake SHM</div>
      <div className="stat-value">
        {this.state.StakeReqSHM.toFixed(0)}
      </div>
      <div className="stat-desc">
        Required Stake (SHM) * Stability Factor
      </div>
    </div>
  </div>







</div>
  </div>

      </ >);
  }
}
