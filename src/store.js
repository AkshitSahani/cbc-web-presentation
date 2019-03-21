import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WeatherReducer from './Reducers/WeatherReducer';

const appReducer = combineReducers({
  weather: WeatherReducer
});

const store = createStore(appReducer, {}, applyMiddleware(thunk));

export default store;
