import React from 'react';
import Elements from './Elements';
import WeatherImage from './WeatherImage';
import Temperature from './Temperature';

const CurrentWeather = (props) => {
  return (
    <div className="weather-container">

      <div className="unit-change">
        <button
          className="unit-button"
          style={{color: props.unit === 'metric' ? '#115278' : '#78818E'}}
          onClick={() => props.switchUnit('imperial')}
        >
          &deg;F
        </button>

        |

        <button
          className="unit-button"
          style={{color: props.unit === 'metric' ? '#78818E' : '#115278'}}
          onClick={() => props.switchUnit('metric')}
        >
          &deg;C
        </button>
      </div>
      <div className="weather-main">
        <div className="weather-left">
          <WeatherImage
            load={props.load}
          />
        </div>
        <div className="weather-right">
          <Temperature load={props.load}/>
          <Elements load={props.load}/>
        </div>
      </div>
    </div>
  )
};

export default CurrentWeather;
