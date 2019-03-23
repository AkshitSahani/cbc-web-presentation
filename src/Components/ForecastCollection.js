import React, {Component} from 'react';
import {connect} from 'react-redux';
import DayForecast from './DayForecast';
import {roundNum} from '../Functions/common';

class ForecastCollection extends Component {

  getDate = (input) => (new Date(`${input}.000Z`)).toLocaleDateString('en-US', {day: 'numeric', weekday: 'long', month: 'long'})

  renderForecasts = () => {
    // console.log('in render forecasts function');
    const {forecastData} = this.props;
    var width = `${(100/forecastData.length)-1}%`;
    return forecastData.map((data) => {
      // console.log('inside map function!');
      const {value, unit} = data.temperature;
      let date = this.getDate(data.from).split(',');
      // console.log('date from func', date);
      return (
        <DayForecast
          key={data.from}
          date={date}
          var={data.symbol.var}
          name={data.symbol.name}
          temperature={roundNum(value/1)}
          unit={unit === 'imperial' ? 'F' : 'C'}
          style={{width}}
        />
      )
    })
  }
  render() {
    return (
      <div className="forecasts-container">
        <span
          className="current-conditions"
          style={{marginTop: 30, marginBottom: 3}}
        >
          Extended Forecast
        </span>
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
