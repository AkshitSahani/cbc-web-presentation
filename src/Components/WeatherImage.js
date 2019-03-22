import React from 'react';
import {connect} from 'react-redux';

const WeatherImage = (props) => {
  return (
    <div>
      {
        props.load &&
        <img
          src={`http://openweathermap.org/img/w/${props.weatherImage.icon}.png`}
          className="weather-image"
        />
      }
      {/* <span>
        {props.weatherImage.}
      </span> */}
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
