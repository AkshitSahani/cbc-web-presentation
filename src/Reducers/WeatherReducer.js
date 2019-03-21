// import React from 'react';

const initialState = {

};
const WeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setWeatherData':
      console.log('in setWeatherData in reducer', action.data);
      return {...state, ...action.data};
    default:
      return null;
  }
}

export default WeatherReducer;
