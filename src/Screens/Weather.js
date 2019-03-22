import React, {Component} from 'react';
import * as WeatherActions from '../Actions/WeatherActions';
import {connect} from 'react-redux';
// var convert = require('xml-js');
// var parseString = require('xml2js').parseString;
import Spinner from '../Components/Spinner';
import {xmlToJson} from '../Functions/common';
// import Elements from '../Components/Elements';
// import WeatherImage from '../Components/WeatherImage';
// import LocationDisplay from '../Components/LocationDisplay';
// import Temperature from '../Components/Temperature';
import LocationErrorModal from '../Components/LocationErrorModal';
import CurrentWeather from '../Components/CurrentWeather';
// import logo from '../../public/assets/cbc.png';

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
};

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
      this.setState({locationError: 'Unfortunately, gelocation is not supported by this browser. Please input your location manually', showModal: true,});
    }
  }

  locationSuccess = (position) => {
    console.log('in success function', position);
    const {latitude, longitude} = position.coords;
    console.log('lat', latitude, 'lng', longitude);
    this.setState({latitude, longitude});
    this.fetchData('Weather');
    this.fetchData('Forecast');
  }

  locationFailure = (error) => {
  // locationFailure = ({message}) => {
    console.log('in failure function', error, error.message);
    this.setState({loading: false, locationError: error.code, showModal: true});
    // this.setState({loading: false, locationError: message, showModal: true});
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
      this.fetchData('Weather');
      this.fetchData('Forecast');
    }
  }

  fetchData = async(type) => {
  // fetchData = async(lat, lon) => {
    // console.log('in fetch data func', lat, lon);
    // console.log('inside func', type);
    if(!this.state.locationError){
      // console.log('inside condition', type);
      if(!this.state.loading){
        this.setState({loading: true});
      }

      const {latitude, longitude} = this.state;
      // let key = ;
      // console.log('key!!!!!', key);
      try{
        // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&mode=${format}&APPID=${apiKey}&units=${this.state.unit}`;
        const url = `https://api.openweathermap.org/data/2.5/${type.toLowerCase()}?lat=${latitude}&lon=${longitude}&mode=${format}&APPID=${apiKey}&units=${this.state.unit}`;
        // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&mode=${format}&APPID=${apiKey}&units=${this.state.unit}`;
        const response = await fetch(url);
        // console.log('resp from fetch Data', response.json());
        const xmlResp = await this.processResponse(response);
        console.log('xmlResp', xmlResp);
        // var xmlText = new XMLSerializer().serializeToString(xmlResp);
        // console.log('xmlText', xmlText);
        const jsonResp = xmlToJson(xmlResp);
        // var result1 = convert.xml2json(xmlText, {compact: true, spaces: 4});
        // console.log('result!!!!!!!', result1);
        // parseString(xmlText, (err, res) => {
        //   console.log('resp from parse string', res);
        //   console.log('finalllll', JSON.stringify(res))
        // });
        let data;
        // = type === 'Weather' ? jsonResp.current : jsonResp.weatherdata.forecast;
        if(type === 'Weather'){
          data = jsonResp.current;
        }
        else{
          data = [];
          jsonResp.weatherdata.forecast.time.forEach((d) => {
            if(d.from.indexOf('T18:00:00') !== -1){
              console.log('instance I need', d);
              data.push(d);
            }
          });
        }
        console.log('data', data);
        this.props.setWeatherData(type, data);
        this.setState({loading: false, dataLoaded: true});
        console.log('jsonResp', jsonResp);

        // return fetch(url)
        //   .then(response => response.text())
        //   .then(str => (new DOMParser()).parseFromString(str, "application/xml"))
        //   .then(data => console.log(data))
        //   .catch(e=>console.log('error', e))
      }
      catch(e){
        console.log('error in fetching data', e);
        console.log('full error', e.response);
        this.setState({loading: false});
      }
    }
  }

  fullLocalDate = (date) => (new Date(`${date}.000Z`)).toDateString() + ' ' + (new Date(`${date}.000Z`)).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'});

  render(){
    console.log('data in reducer', this.props.forecast);
    return (
      <div>

        <img src={require("../assets/cbc.png")} height="60" width="60"/>
        <h1>
          Welcome to the CBC Weather Forecaster
        </h1>

        <Spinner
          loading={this.state.loading}
          // style={{alignSelf: 'center'}}
        />

        {
          this.state.dataLoaded &&
          <div className="location">
            Your location: {`${this.props.city.name}, ${this.props.city.country}`}
          </div>
        }

        {
          this.state.dataLoaded &&
          <div className='current-conditions'>
            Current Conditions
            <span className="local-date">
              as of {this.fullLocalDate(this.props.city.lastUpdate)}
            </span>
          </div>
        }

        {/* <button onClick={this.fetchData}>
          REFRESH
        </button> */}

        {
          this.state.dataLoaded ?
            <CurrentWeather
              unit={this.state.unit}
              switchUnit={this.switchUnit}
            />
          :
          null
        }

        {
          this.state.locationError &&
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
