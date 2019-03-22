import React from 'react';
import {connect} from 'react-redux';

const LocationDisplay = (props) => {
  return (
    <div>
      {props.load && `${props.city.name}, ${props.city.country}`}
      <br/>
      {props.load && `Conditions as of ${fullLocalDate(props.city.lastUpdate)}`}
    </div>
  )
}

const mapStateToProps = (state) => {
  const {city} = state.weather;
  return {
    city
  }
}

export default connect(mapStateToProps)(LocationDisplay);

const fullLocalDate = (date) => (new Date(`${date}.000Z`)).toDateString() + ' ' + (new Date(`${date}.000Z`)).toLocaleTimeString();
