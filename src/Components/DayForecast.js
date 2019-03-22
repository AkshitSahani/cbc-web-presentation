import React, {Component} from 'react';
// import {connect} from 'react-redux';
import WeatherImage from './WeatherImage';

const DayForecast = (props) => {
  return (
    <div className="forecast-single">
      {/* {console.log('in day Forecast, data--->', props.forecastData);} */}
      <div>
        {props.date[0]}
        <br /><br />
        {props.date[1]}
      </div>

      <WeatherImage
        forecastIcon={props.var}
        forecastValue={props.name}
      />

      <span>
        {props.temperature} &deg;{props.unit}
      </span>
    </div>
  )
}

// const mapStateToProps = (state) => {
//   // const {forecastData} = state.forecast;
//   // return {
//   //   forecastData
//   // }
// }

export default DayForecast;
// export default connect(mapStateToProps)(DayForecast);
