import React, {Component} from 'react';
import * as WeatherActions from '../Actions/WeatherActions';
import {connect} from 'react-redux';
// var convert = require('xml-js');
// var parseString = require('xml2js').parseString;
import Spinner from '../Components/Spinner';
import {xmlToJson} from '../Functions/common';
import Elements from '../Components/Elements';
import WeatherImage from '../Components/WeatherImage';
import LocationDisplay from '../Components/LocationDisplay';
import Temperature from '../Components/Temperature';

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
};

//api request options
const format = 'xml';
// const units = 'metric';
const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`;
// const requestOptions = {
//   apiKey: `${process.env.REACT_APP_WEATHER_API_KEY}`,
//
// }

class Weather extends Component {

  state = {
    data: null,
    loading: true,
    dataLoaded: false,
    unit: 'metric'
  }

  // test = () => {
  //   prompt(window,
  //          "extensions.foo-addon.allowGeolocation",
  //          "Foo Add-on wants to know your location.",
  //          function callback(allowed) { alert(allowed); });
  // }

  componentDidMount(){
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationFailure, locationOptions)
      //show modal with instructions to turn on location for website if user denies once!
    }
    else{
      console.log('gelocation is not supported by this browser!!');
    }
  }

  locationSuccess = (position) => {
    console.log('in success function', position);
    const {latitude, longitude} = position.coords;
    console.log('lat', latitude, 'lng', longitude);
    this.setState({latitude, longitude});
    this.fetchData(latitude, longitude);
  }

  locationFailure = (error) => {
    console.log('in failure function', error);
    this.setState({loading: false, error});
  }

  processResponse = async(response) => {
    const textResp = await response.text();
    console.log('textResp!!!!!', textResp);
    const xml = await (new DOMParser()).parseFromString(textResp, 'application/xml');
    // console.log('processed Response', xml);
    return xml;
  }



  // prompt(window, pref, message, callback) {
  //   let branch = Components.classes["@mozilla.org/preferences-service;1"]
  //                          .getService(Components.interfaces.nsIPrefBranch);
  //
  //   if (branch.getPrefType(pref) === branch.PREF_STRING) {
  //       switch (branch.getCharPref(pref)) {
  //       case "always":
  //           return callback(true);
  //       case "never":
  //           return callback(false);
  //       }
  //   }
  //
  //   let done = false;
  //
  //   function remember(value, result) {
  //       return function() {
  //           done = true;
  //           branch.setCharPref(pref, value);
  //           callback(result);
  //       }
  //   }
  //
  //   let self = window.PopupNotifications.show(
  //       window.gBrowser.selectedBrowser,
  //       "geolocation",
  //       message,
  //       "geo-notification-icon",
  //       {
  //           label: "Share Location",
  //           accessKey: "S",
  //           callback: function(notification) {
  //               done = true;
  //               callback(true);
  //           }
  //       }, [
  //           {
  //               label: "Always Share",
  //               accessKey: "A",
  //               callback: remember("always", true)
  //           },
  //           {
  //               label: "Never Share",
  //               accessKey: "N",
  //               callback: remember("never", false)
  //           }
  //       ], {
  //           eventCallback: function(event) {
  //               if (event === "dismissed") {
  //                   if (!done) callback(false);
  //                   done = true;
  //                   window.PopupNotifications.remove(self);
  //               }
  //           },
  //           persistWhileVisible: true
  //       });
  //   }

  switchUnit = async(unit) => {
    // let unit = this.state.unit === 'metric' ? 'imperial' : 'metric';
    if(this.state.unit !== unit){
      await this.setState({unit});
      this.fetchData();
    }
  }

  fetchData = async() => {
  // fetchData = async(lat, lon) => {
    // console.log('in fetch data func', lat, lon);
    if(!this.state.loading){
      this.setState({loading: true});
    }

    const {latitude, longitude} = this.state;
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&mode=${format}&APPID=${apiKey}&units=${this.state.unit}`;
      // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&mode=xml&APPID=ea4d580ff1e59a02c1837843ebdeccdc`;
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
      this.props.setWeatherData(jsonResp.current);
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


  render(){
    console.log('data in reducer', this.props.data);
    return (
      <div>
        <h1>
          Welcome to the CBC Weather!!!
        </h1>

        {/* <button onClick={this.test}> */}
        {/* <button onClick={this.getCurrentLocation}> */}

        <LocationDisplay
          load={this.state.dataLoaded}
        />

        <button
          style={{color: this.state.unit === 'metric' ? 'red' : 'black'}}
          onClick={() => this.switchUnit('imperial')}
        >
          K
        </button>

        <button
          style={{color: this.state.unit === 'metric' ? 'black' : 'red'}}
          onClick={() => this.switchUnit('metric')}
        >
          C
        </button>

        <button onClick={this.fetchData}>
          REFRESH
        </button>

        <Temperature
          load={this.state.dataLoaded}
        />

        <Spinner
          loading={this.state.loading}
          // style={{alignSelf: 'center'}}
        />

        <Elements
          load={this.state.dataLoaded}
        />

        <WeatherImage
          load={this.state.dataLoaded}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.weather,
  }
}

export default connect(mapStateToProps, WeatherActions)(Weather);
