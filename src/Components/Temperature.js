import React from 'react';
import {connect} from 'react-redux';
import {roundNum} from '../Functions/common';

const Temperature = (props) => {
  return (
    <div>
      {props.load && <div>{`${roundNum(props.temperature.value)} ${props.temperature.unit === 'metric' ? '.C' : 'K'}`}</div>}
      {props.load && <div>Max: {roundNum(props.temperature.max)}</div>}
      {props.load && <div>Min: {roundNum(props.temperature.min)}</div>}
      {props.load && <div>{props.temperature.name}</div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  const {temperature} = state.weather;
  console.log('temp in temperature comp', temperature);
  return {
    temperature
  }
}

export default connect(mapStateToProps)(Temperature)
