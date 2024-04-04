import { useState } from "react";


export default function RangeSlider(props) {
  const [value, setValue] = useState(props.start);

  return (

    <>
    <div className="form-control min-h-200 pt-5">
    <label className="label">
      <span className="label-text">{props.title}</span>
    </label>
    <div className="range range-primary range-info">

      <input
        type="range"
        min="1"
        max={props.max}
        onChange={(e) => { props.onSliderChange(e); setValue(e.target.value)}}
        value={value}
      />
    <span className="pl-2">{props.desc} {value}</span>
    </div>
  </div>

    </>
  );
}
