import React from 'react';
import {connect} from 'react-redux';

const WeatherImage = (props) => {
  return (
    <div className="weather-img-container">
      <img
        src={`http://openweathermap.org/img/w/${props.weatherImage.icon}.png`}
        className="weather-img"
        alt="forecast-img"
      />
      <span className="img-desc">
        {props.weatherImage.value}
      </span>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {weatherImage} = state.weather;
  return {
    weatherImage
  }
}

export default connect(mapStateToProps)(WeatherImage)
