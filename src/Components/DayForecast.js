import React from 'react';
import WeatherImage from './WeatherImage';

const DayForecast = (props) => {
  return (
    <div className="forecast-single">
      <div className="forecast-top">
        <span>
          {props.date[0]}
        </span>
        <span style={{paddingTop: 10}}>
          {props.date[1]}
        </span>
      </div>

      <WeatherImage
        forecastIcon={props.var}
        forecastValue={props.name}
      />

      <span className="bold" style={{paddingTop: 5}}>
        {props.temperature} &deg;{props.unit}
      </span>
    </div>
  )
}

export default DayForecast;
