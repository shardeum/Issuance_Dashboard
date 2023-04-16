import React from "react";
import {jsPDF} from "jspdf";
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

import EthereumPrice from ".././components/SimData/eth-price.txt";
import EthereumTX from ".././components/SimData/eth-tx-vol.txt";
import AlgorandPrice from ".././components/SimData/algo-price.txt";
import AlgorandTX from ".././components/SimData/algo-tx-vol.txt";
import BSCPrice from ".././components/SimData/bnb-price.txt";
import BSCTX from ".././components/SimData/bsc-tx-vol.txt";
import PolygonPrice from ".././components/SimData/matic-price.txt";
import PolygonTX from ".././components/SimData/poly-tx-vol.txt";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default class Simulations extends React.Component {
  state = {
    NodeTPS: 2,
    Nodes: 600,
    NodesPerShard: 120,
    NetworkTPS: 20,
    TXfees: 0.01,
    NodeRewardPerHour: 1,
    Stake: 1000,
    StabilityFactor: 1,
    SHMValue: 1,
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
    MinNodes: 600,
    CustomTXChecked: false,
    CustomDisabled: true,
    CustomPriceFileChecked: false,
    CustomTXFileChecked: false,
    CustomPriceFileDisabled: false,
    CustomTXFileDisabled: false,
    priceData: [],
    txvolData: [],
    MaxSHMReached: 0
  };

  onCustomPriceFileCheckedChange = (event) => {
    this.setState({
      CustomPriceFileChecked: !this.state.CustomPriceFileChecked,
      CustomPriceFileDisabled: !this.state.CustomPriceFileDisabled
    });
    document.querySelector("#priceFile").classList.toggle('FileShown');
    document.querySelector("#priceFile").classList.toggle('FileHidden');

    document.querySelector(".FileSelect").selectedIndex = 0;
  };

  onCustomTXFileCheckedChange = (event) => {
    this.setState({
      CustomTXFileChecked: !this.state.CustomTXFileChecked,
      CustomTXFileDisabled: !this.state.CustomTXFileDisabled
    });
    document.querySelector("#txvolData").classList.toggle('FileShown');
    document.querySelector("#txvolData").classList.toggle('FileHidden');
    document.querySelector(".TXSelect").selectedIndex = 0;

  };

  onDrawChart = (event) => {

    // the amount of data points for price and tx volume may be different.
    // we assume the most current data point is for the same day.
    // select only the part where both have data points
    const minData = Math.min(this.state.priceData.length, this.state.txvolData.length)

    if (this.state.priceData.length === 0) {

      alert('Please upload a valid price file.');
      return;
    }
    if (this.state.txvolData.length === 0) {

      alert('Please upload a valid tx volume file.');
      return;
    }

    let priceData = [...this.state.priceData].splice(0 - minData)
    let txvolData = [...this.state.txvolData].splice(0 - minData)

    const canvas = document.getElementById('simChart');
    const ctx = canvas.getContext('2d');

    if (window.myChart) {
      window.myChart.destroy();
    }

    const priceDataset = priceData.map((value, index) => {
      return {x: index, y: value};

    });
    const txvolDataset = txvolData.map((value, index) => {
      return {x: index, y: value};
    });

    const activeDataset = txvolData.map((value, index) => {
      return {
        x: index,
        y: Math.max(this.state.MinNodes, value / 86400 / this.state.TPSPerNode * this.state.NodesPerShard)
      };
    });

    const netrevDataset = txvolData.map((value, index) => {
      return {
        x: index,
        y: value * this.state.AvgTxFee
      };
    });
    const netexpDataset = activeDataset.map((value, index) => {
      return {
        x: index,
        y: value.y * this.state.NodeRewardPerHour * 24
      };
    });
    const netincDataset = netrevDataset.map((value, index) => {
      return {
        x: index,
        y: value.y - netexpDataset[index].y
      };
    });
    const shmdelDataset = netincDataset.map((value, index) => {
      return {
        x: index,
        y: value.y / priceDataset[index].y
      };

    });
    let shmsup = 0
    const shmsupDataset = shmdelDataset.map((value, index) => {
      shmsup -= value.y
      return {x: index, y: shmsup};

    });

    this.setState({
      MaxSHMReached: Math.max(...shmsupDataset.map(o => o.y))

    })

    document.querySelector(".chartBox").style.display = "block";

    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Tx Volume',
            data: txvolDataset,
            borderColor: 'rgb(75, 192, 192)',
            tension: 1,
            yAxisID: 'y-txvol'
          }, {
            label: 'Price Data',
            data: priceDataset,
            borderColor: 'rgb(255, 99, 132)',
            tension: 1,
            yAxisID: 'y-price'
          }, {
            label: 'Active Nodes',
            data: activeDataset,
            borderColor: 'rgb(200, 99, 200)',
            tension: 1,
            yAxisID: 'y-active'
          }, {
            label: 'Supply Data',
            data: shmsupDataset,
            borderColor: 'rgb(132, 99, 255)',
            tension: 1,
            yAxisID: 'y-shmsup'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: "Node Reward Simulation"
          },
          legend: {
            display: true
          },
          colors: {
            enabled: true
          }
        },
        scales: {
          x: {
            display: true,
            type: 'linear',
            title: {
              display: true,
              text: 'Days Since Genesis'
            },
            min: 0,
            max: 2000,
            ticks: {
              callback: (value, index, values) => {
                return value.toFixed(0);
              }
            }
          },
          'y-price': {
            display: false
          },
          'y-txvol': {
            display: false,
            type: 'logarithmic',
            position: 'right',
            title: {
              display: true,
              text: 'Tx Volume'
            },
            min: 0,
            max: Math.max(...txvolData)
          },

          'y-shmsup': {
            display: true,
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'SHM Supply'
            },
            min: 0
          },
          'y-active': {
            display: false,
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Active Nodes'
            },
            min: Math.min.apply(null, activeDataset.map(function(a) {
              return a.y;
            })),
            max: Math.max.apply(null, activeDataset.map(function(a) {
              return a.y;
            })),
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
    document.querySelector(".paramChange").classList.remove('FileShown');
  };

  onPriceFileChange = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split('\n');
      this.setState({
        priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

      })
    };

    reader.readAsText(file);
    document.querySelector(".paramChange").classList.add('FileShown');

  }

  onPriceFileSelect = (event) => {

    async function getFile(fileURL) {
      let fileContent = await fetch(fileURL);
      fileContent = await fileContent.text();
      return fileContent;
    }

    if (document.querySelector(".FileSelect").value === "Ethereum") {

      // Passing file url
      getFile(EthereumPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".FileSelect").value === "Algorand") {

      getFile(AlgorandPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".FileSelect").value === "BNB Smart Chain") {

      getFile(BSCPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".FileSelect").value === "Matic") {

      getFile(PolygonPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    }
    document.querySelector(".paramChange").classList.add('FileShown');
  }

  onTXFileSelect = (event) => {

    async function getFile(fileURL) {
      let fileContent = await fetch(fileURL);
      fileContent = await fileContent.text();
      return fileContent;
    }

    if (document.querySelector(".TXSelect").value === "Ethereum") {

      // Passing file url
      getFile(EthereumTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".TXSelect").value === "Algorand") {

      getFile(AlgorandTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".TXSelect").value === "BNB Smart Chain") {

      getFile(BSCTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".TXSelect").value === "Polygon") {

      getFile(PolygonTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    }
    document.querySelector(".paramChange").classList.add('FileShown');
  }

  onTxFileChange = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split('\n');
      this.setState({
        txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))
      })
    };

    reader.readAsText(file);
    document.querySelector(".paramChange").classList.add('FileShown');
  }

  componentDidMount() {
    this.setState({
      AvgTxFee: this.state.TXfees * 2,
      ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
      StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
    }, () => this.updateIncome());
  };

  onCustomTXCheckedChange = (event) => {
    this.setState({
      CustomTXChecked: !this.state.CustomTXChecked,
      CustomDisabled: !this.state.CustomDisabled
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');
  };

  onNodesPerShardChange = (event) => {
    this.setState({
      NodesPerShard: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');
  };

  onTXfeesChange = (event) => {
    this.setState({
      TXfees: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onNodeRewardPerHourChange = (event) => {
    this.setState({
      NodeRewardPerHour: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onStakeChange = (event) => {
    this.setState({
      Stake: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onStabilityFactorChange = (event) => {
    this.setState({
      StabilityFactor: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onMinNodesChange = (event) => {
    this.setState({
      MinNodes: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  updateMonitoring = (event) => {
    if (this.state.CustomTXChecked === true) {
      if (this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard >= this.state.MinNodes) {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.AvgTxFee,
          ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      } else {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.AvgTxFee,
          ActiveNodes: this.state.MinNodes,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      }
    } else {
      if (this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard >= this.state.MinNodes) {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.TXfees * 2,
          ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      } else {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.TXfees * 2,
          ActiveNodes: this.state.MinNodes,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      }

    }

  };

  onSHMValueChange = (event) => {
    this.setState({
      SHMValue: event.target.value,
      StabilityFactor: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onAvgTxFeeChange = (event) => {
    this.setState({
      AvgTxFee: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onNetworkTPSChange = (event) => {
    this.setState({
      NetworkTPS: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onActiveNodesChange = (event) => {
    this.setState({
      ActiveNodes: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onSeverRentPerHourChange = (event) => {
    this.setState({
      SeverRentPerHour: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onTPSPerNodeChange = (event) => {
    this.setState({
      TPSPerNode: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onSHMSupplyChange = (event) => {
    this.setState({
      SHMSupply: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onMarketAPYChange = (event) => {
    this.setState({
      MarketAPY: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  updateIncome = (event) => {
    this.setState({
      RevenuePerDay: this.state.NodeRewardPerHour * 24 / (this.state.StandbyRatio + 1),
      ExpensePerDay: this.state.SeverRentPerHour * 24,
      NetworkRevenuePerDay: this.state.NetworkTPS * 86400 * this.state.AvgTxFee,
      NetworkExpensePerDay: this.state.ActiveNodes * this.state.NodeRewardPerHour * 24,
      NetworkDeltaPerDay: this.state.NetworkIncomePerDay / this.state.StabilityFactor
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

  onToggleChart = (event, myChart) => {
    const chartBox = document.querySelector(".chartBox");
    chartBox.classList.toggle("fullScreen");

    console.log(window.myChart.config._config.options.maintainAspectRatio);

    if (window.myChart.config._config.options.maintainAspectRatio === true) {
      window.myChart.config._config.options.maintainAspectRatio = false;
    } else {
      window.myChart.config._config.options.maintainAspectRatio = true;
    }
    window.myChart.update()

  }

  onDownloadPDF = (event) => {

    const canvas = document.querySelector("#simChart")
    console.log(canvas)
    const canvasImage = canvas.toDataURL("image/jpeg", 1.0);
    let pdf = new jsPDF("landscape");
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, 'JPEG', 10, 25, 280, 150);
    pdf.text("Shardeum Simulation Download", 10, 15);
    pdf.save("Shardeum_Simulation.pdf");

  }

  getNumber = (labelValue) => {

    return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions
      : Math.abs(Number(labelValue)) >= 1.0e+6

        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

          ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

          : Math.abs(Number(labelValue));

  }

  render() {

    return (<>

      <h2 className="pt-5">Node Reward Simulations</h2>
      <div className="flex flex-wrap pt-5" >

    <div className="flex flex-col chart min-w-[50%]">

      <div className="form-control w-full max-w-xs">

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pick a price file</span>
          </label>
          <select className="select select-bordered FileSelect" disabled={this.state.CustomPriceFileDisabled} onChange={this.onPriceFileSelect}>
            <option disabled="disabled" selected="selected">Pick one</option>
            <option>Algorand</option>
            <option>BNB Smart Chain</option>
            <option>Ethereum</option>
            <option>Matic</option>

          </select>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text customLabel">Upload a custom price file (.txt format)
              </span>
              <input type="checkbox" checked={this.state.CustomPriceFileChecked} className="checkbox checkbox-secondary" onChange={this.onCustomPriceFileCheckedChange}/>

            </label>
          </div>

        </div>

        <label className="label" htmlFor="priceFile"></label>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs FileHidden" id="priceFile" name="priceFile" accept=".txt" onChange={this.onPriceFileChange}/>

      </div>

    </div>

    <div className="flex flex-col min-w-[50%]">

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Pick a transaction file</span>
        </label>
        <select className="select select-bordered TXSelect" disabled={this.state.CustomTXFileDisabled} onChange={this.onTXFileSelect}>
          <option disabled="disabled" selected="selected">Pick one</option>
          <option>Algorand</option>
          <option>BNB Smart Chain</option>
          <option>Ethereum</option>
          <option>Polygon</option>

        </select>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text customLabel">Upload a custom transaction file (.txt format)
            </span>
            <input type="checkbox" checked={this.state.CustomTXFileChecked} className="checkbox checkbox-secondary" onChange={this.onCustomTXFileCheckedChange}/>

          </label>
        </div>
        <label className="label" htmlFor="txvolData"></label>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs FileHidden" id="txvolData" name="txvolData" accept=".txt" onChange={this.onTxFileChange}/>

      </div>

      <button className="btn mt-5" onClick={this.onDrawChart}>Run Simulation</button>
      <div className="label-text customLabel pt-5 paramChange FileHidden ">*Parameters updated please re-run simulation</div>
    </div>

  </div>

  <div className="flex flex-wrap">

    <div className="flex-1 chart w-100 pt-10">

      <div className="chartCard">
        <div className="chartBox">
          <button className="btn secondary hidden sm:block " onClick={this.onToggleChart}>Toogle View</button>
          <div className="flex-1 min-w-full apr-stats items-center">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Revenue/day</div>
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
                <div className="stat-title">Expense/day</div>
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
                <div className="stat-title">Income/day</div>
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
                <div className="stat-title">APY/year</div>
                <div className="stat-value">
                  {this.state.APYPerYear.toFixed(0) + "%"}
                </div>
                <div className="stat-desc">
                  100 * Income * 365 / Stake
                </div>
              </div>
            </div>

            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Peak SHM Supply</div>
                <div className="stat-value">
                  {this.getNumber(this.state.MaxSHMReached)}
                </div>
                <div className="stat-desc">
                  Max(all daily supply)
                </div>
              </div>
            </div>
          </div>
          <div className="holder">
            <span id="info"/>
            <canvas id="simChart"/>
          </div>
          <button className="btn secondary" onClick={this.onDownloadPDF}>Download PDF</button>
        </div>
      </div>

    </div>

  </div>

  <div className="flex flex-wrap">

    <div className="flex flex-col min-w-[50%] apr-stats">

      <div className="flex-col pt-10">
        <h2>Network</h2>

        <div className="form-control min-h-200">
          <label className="label">
            <span className="label-text">Nodes per Shard</span>
          </label>
          <div className="tooltip" data-tip="Determines security and redundancy of the network">
            <label className="input-group">
              <input type="text" value={this.state.NodesPerShard} className="input input-bordered" disabled="disabled" onChange={this.onNodesPerShardChange}/>
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
              <input type="text" value={this.state.MinNodes} className="input input-bordered" disabled="disabled" onChange={this.onMinNodesChange}/>
              <span>Nodes</span>
            </label>
          </div>
        </div>

      </div>
    </div>
    <div className="flex flex-col min-w-[50%] apr-stats pt-10">
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
          <span className="label-text">Stable Price $/SHM</span>
        </label>
        <div className="tooltip" data-tip="Same as SHM price, but set by FDAO into network. Updated about once a day. Used by the network to determine the SHM amount for target Tx Fee, Node reward and Stake amount.">
          <label className="input-group">
            <input type="text" value={this.state.SHMValue} className="input input-bordered" disabled="disabled" onChange={this.onStabilityFactorChange}/>

          </label>
        </div>
      </div>

    </div>

    <div className="flex flex-col min-w-[50%] apr-stats">
      <h2 className="pt-10">FDAO Monitoring</h2>
      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">SHM Price $</span>
        </label>
        <div className="tooltip" data-tip="FDAO uses this to set the Stability Factor. Stability factor changed about once a day.">
          <label className="input-group">
            <input type="text" value={this.state.SHMValue} className="input input-bordered" disabled="disabled" onChange={this.onSHMValueChange}/>
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
            <input type="text" value={this.state.AvgTxFee} className="input input-bordered" disabled={this.state.CustomDisabled} onChange={this.onAvgTxFeeChange}/>
            <span>USD</span>

          </label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text customLabel">Use custom TX Fee
              </span>
              <input type="checkbox" checked={this.state.CustomTXChecked} className="checkbox checkbox-secondary" onChange={this.onCustomTXCheckedChange}/>

            </label>
          </div>
        </div>

      </div>

    </div>

    <div className="flex flex-col min-w-[50%] apr-stats">
      <h2 className="pt-10">Continued...</h2>

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

      <div className="form-control min-h-200">
        <label className="label">
          <span className="label-text">Standby Ratio #</span>
        </label>
        <div className="tooltip" data-tip="Standby  / Active
Increasing the node reward will increase this.
Will probably increase until the APY is close to Market APY

Standby ratio = Node reward x 24 /
                            (Market APY x Stake amount / 365 x 100 +
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
        <div className="tooltip" data-tip="Cool TPS per node; about 20% of Max TPS; node can easily handle this TPS.">
          <label className="input-group">
            <input type="text" value={this.state.TPSPerNode} className="input input-bordered" disabled="disabled" onChange={this.onTPSPerNodeChange}/>
            <span>TPS</span>
          </label>
        </div>
      </div>

    </div>

    < /div></ >);
  }
}
