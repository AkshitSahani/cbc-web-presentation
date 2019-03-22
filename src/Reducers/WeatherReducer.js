const initialState = {
  elements: {
    wind: {},
    visibility: {},
    humidity: {},
    sunrise: '',
    pressure: {},
    sunset: ''
    // sun: {}
  },
  temperature: {},
  city: {},
  weatherImage: {}
};

const WeatherReducer = (state = initialState, action) => {
  const {data, type} = action;
  switch (type) {
    case 'setWeatherData':
      console.log('in setWeatherData in reducer', data);
      const {humidity, pressure, visibility, wind, city, temperature, clouds, weather, lastupdate} = data;
      // const
      console.log(humidity, pressure, visibility, wind, city, temperature, clouds, weather, lastupdate);
      console.log('initialState', initialState);
      return {
        ...state,
        elements: {
          ...state.elements,
          wind: {
            ...state.elements.wind,
            direction: {
              ...state.elements.wind,
              ...wind.direction
            },
            gusts: {
              ...state.elements.gusts,
              ...wind.gusts,
            },
            speed: {
              ...state.elements.speed,
              ...wind.speed
            }
          },
          visibility: {
            ...state.elements.visibility,
            ...visibility
          },
          humidity: {
            ...state.elements.humidity,
            ...humidity,
          },
          sunrise: city.sun.rise,
          pressure: {
            ...state.elements.pressure,
            ...pressure
          },
          // sun: {
            // ...state.elements.sun,
            sunset: city.sun.set
          // }
        },
        temperature: {
          ...state.temperature,
          ...clouds,
          ...temperature,
        },
        city: {
          ...state.city,
          name: city.name,
          country: city.country,
          lastUpdate: lastupdate.value,
        },
        weatherImage: {
          ...state.weatherImage,
          ...weather
        }
      };
    default:
      return state;
  }
}

export default WeatherReducer;
