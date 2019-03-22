import React from 'react';
import {connect} from 'react-redux';
import {roundNum} from '../Functions/common';

const Temperature = (props) => {
  return (
    <div className="temp-container">
      <span className="temp-main">
        {roundNum(props.temperature.value)} &deg;{props.unit}
      </span>
      {/* <div> */}
        <span className="temp max">
          Max: {roundNum(props.temperature.max)} &deg;{props.unit}
        </span>
        <span className="temp min">
          Min: {roundNum(props.temperature.min)} &deg;{props.unit}
        </span>
      {/* </div> */}
      {/* {<div>{props.temperature.name}</div>} */}
    </div>
  )
}

const mapStateToProps = (state) => {
  const {temperature} = state.weather;
  console.log('temp in temperature comp', temperature);
  const unit = temperature.unit === 'metric' ? 'C' : 'F';
  return {
    temperature,
    unit
  }
}

export default connect(mapStateToProps)(Temperature);
