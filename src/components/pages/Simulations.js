import React from 'react';

export default function Simulations() {


  return(

    <>

     <div className="flex content-center items-top text-xl text-stone-300 py-5">
    <select className="select select-primary w-full max-w-xs">
  <option disabled selected>Select historical data</option>
  <option>Eth</option>
  <option>Algo</option>
  <option>Matic</option>
  <option>BNB</option>
  <option>Custom</option>
</select>

</div>

<div className="py-5">

<input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />

</div>

  <div className>
  <img
    src="chart_example.png"
    class="h-auto max-w-full width100"
    alt="..." />
</div>


</>

)}
