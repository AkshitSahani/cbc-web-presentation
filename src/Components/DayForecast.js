import React, {Component} from 'react';
import {connect} from 'react-redux';

const DayForecast = (props) => {
  return (
    <div className="forecast">
      {console.log('in day Forecast, data--->', props.forecastData);}
    </div>
  )
}

const mapStateToProps = (state) => {
  const {forecastData} = state.forecast;
  return {
    forecastData
  }
}

export default connect(mapStateToProps)(DayForecast);
