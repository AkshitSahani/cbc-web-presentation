import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WeatherReducer from './Reducers/WeatherReducer';
import ForecastReducer from './Reducers/ForecastReducer';

const appReducer = combineReducers({
  weather: WeatherReducer,
  forecast: ForecastReducer
});

const store = createStore(appReducer, {}, applyMiddleware(thunk));

export default store;
