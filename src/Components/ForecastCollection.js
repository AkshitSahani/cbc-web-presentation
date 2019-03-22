import React, {Component} from 'react';
import {connect} from 'react-redux';
import DayForecast from './DayForecast';
import {roundNum} from '../Functions/common';

class ForecastCollection extends Component {

  getDate = (input) => (new Date(`${input}.000Z`)).toLocaleDateString('en-US', {day: 'numeric', weekday: 'long', month: 'long'})

  renderForecasts = () => {
    console.log('in render forecasts function');
    return this.props.forecastData.map((data) => {
      console.log('inside map function!');
      const {value, unit} = data.temperature;
      let date = this.getDate(data.from).split(',');
      console.log('date from func', date);
      return (
        <DayForecast
          key={data.from}
          date={date}
          var={data.symbol.var}
          name={data.symbol.name}
          temperature={roundNum(value/1)}
          unit={unit === 'imperial' ? 'F' : 'C'}
        />
      )
    })
  }
  render() {
    return (
      <div className="forecasts-container">
        <h2>
          Extended Forecast
        </h2>
        <div className="forecast-all">
          {this.renderForecasts()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {forecastData} = state.forecast;
  return {
    forecastData
  }
}

export default connect(mapStateToProps)(ForecastCollection);
