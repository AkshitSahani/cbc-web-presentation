import React, {Component} from 'react';
import * as WeatherActions from '../Actions/WeatherActions';
import {connect} from 'react-redux';
import Spinner from '../Components/Spinner';
import {xmlToJson} from '../Functions/common';
import LocationErrorModal from '../Components/LocationErrorModal';
import CurrentWeather from '../Components/CurrentWeather';
import ForecastCollection from '../Components/ForecastCollection';

const locationOptions = {
  // enableHighAccuracy: true,
  timeout: 10000,
};

const dateToday = (new Date()).getDate();

//api request options
const format = 'xml';
const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`;

class Weather extends Component {

  state = {
    data: null,
    loading: true,
    dataLoaded: false,
    unit: 'metric',
    showModal: false,
  }

  componentDidMount(){
    this.getCurrentLocation();
  }

  closeModal = () => this.setState({showModal: false});

  getCurrentLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationFailure, locationOptions)
      //show modal with instructions to turn on location for website if user denies once!
    }
    else{
      console.log('gelocation is not supported by this browser!!');
      this.setState({browserError: 'Unfortunately, gelocation is not supported by this browser. You could try with another browser'});
    }
  }

  refreshData = () => {
    this.fetchData('Weather');
    this.fetchData('Forecast');
  }

  locationSuccess = (position) => {
    console.log('in success function', position);
    const {latitude, longitude} = position.coords;
    console.log('lat', latitude, 'lng', longitude);
    this.setState({latitude, longitude});
    // Promise.all([this.fetchData('Weather'), this.fetchData('Forecast')])
    //   .then((values) => {
    //     console.log('PROMISE.ALL VALUES!!!', values);
    //     this.setState({dataLoaded: true});
    //   });
    this.refreshData();
  }

  locationFailure = (error) => {
    console.log('in failure function', error, error.message);
    this.setState({loading: false, locationError: error.code, showModal: true});
  }

  processResponse = async(response) => {
    const textResp = await response.text();
    console.log('textResp!!!!!', textResp);
    const xml = await (new DOMParser()).parseFromString(textResp, 'application/xml');
    // console.log('processed Response', xml);
    return xml;
  }

  switchUnit = async(unit) => {
    if(this.state.unit !== unit){
      await this.setState({unit});
      this.refreshData();
    }
  }

  fetchData = async(type) => {
    if(!this.state.locationError){
      if(!this.state.loading){
        this.setState({loading: true});
      }

      const {latitude, longitude} = this.state;
      let key = type.toLowerCase();
      try{
        // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&mode=${format}&APPID=${apiKey}&units=${this.state.unit}`;
        const url = `https://api.openweathermap.org/data/2.5/${key}?lat=${latitude}&lon=${longitude}&mode=${format}&APPID=${apiKey}&units=${this.state.unit}`;
        // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&mode=${format}&APPID=${apiKey}&units=${this.state.unit}`;
        const response = await fetch(url);
        // console.log('resp from fetch Data', response.json());
        const xmlResp = await this.processResponse(response);
        console.log('xmlResp', xmlResp);
        const jsonResp = xmlToJson(xmlResp);
        let data;
        if(type === 'Weather'){
          data = jsonResp.current;
        }
        else{
          data = [];
          jsonResp.weatherdata.forecast.time.forEach((d) => {
            let dateFromData = (new Date(`${d.from}.000Z`)).getDate();
            if(d.from.indexOf('T18:00:00') !== -1 && dateFromData !== dateToday){
              console.log('instance I need', d);
              data.push(d);
            }
          });
        }
        console.log('data', data);
        this.props.setWeatherData(type, data);
        this.setState({loading: false, [`${key}DataLoaded`]: true});
        console.log('jsonResp', jsonResp);
      }
      catch(e){
        console.log('error in fetching data', e);
        console.log('full error', e.response);
        this.setState({loading: false});
      }
    }
  }

  fullLocalDate = (date) => (new Date(`${date}.000Z`)).toDateString() + ' at ' + (new Date(`${date}.000Z`)).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'});

  render(){
    console.log('data in reducer', this.props.forecast);
    return (
      <div className="content-container">

        <img
          src={require("../assets/cbc.png")}
          height="75"
          width="75"
          alt="cbc logo"
        />

        <h1>
          Welcome to the CBC Weather Forecaster
        </h1>

        <Spinner
          loading={this.state.loading}
        />

        {
          this.state.weatherDataLoaded &&
          <div className="refresh-container">
            <h2>
              {`${this.props.city.name}, ${this.props.city.country}`}
            </h2>

            <button
              onClick={this.refreshData}
              className="refresh-btn"
            >
              Refresh
            </button>
          </div>
        }

        {
          this.state.weatherDataLoaded &&
          <div className='current-conditions'>
            <span>Current Conditions</span>
            <span className="local-date">
              as of {this.fullLocalDate(this.props.city.lastUpdate)}
            </span>
          </div>
        }



        {
          this.state.weatherDataLoaded ?
            <CurrentWeather
              unit={this.state.unit}
              switchUnit={this.switchUnit}
            />
          :
          null
        }

        {
          this.state.forecastDataLoaded ?
            <ForecastCollection

            />
          :
          null
        }

        {
          this.state.browserError &&
          <p className="error">
            {this.state.locationError}
          </p>
        }

        <LocationErrorModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
          error={this.state.locationError}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {city} = state.weather;

  return {
    city,
    forecast: state.forecast
  }
}

export default connect(mapStateToProps, WeatherActions)(Weather);
