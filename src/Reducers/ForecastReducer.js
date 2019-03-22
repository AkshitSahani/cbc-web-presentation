const initialState = {
  forecastData: [],
};

const ForecastReducer = (state = initialState, action) => {
  const {data, type} = action;
  switch (type) {
    case 'setForecastData':
      console.log('inside forecast in reducer', data);
      return {...state, forecastData: [...data]};
      // return {...state, forecastData: [...state.forecastData, ...data]};
    default:
    return state;
  }
}

export default ForecastReducer;
