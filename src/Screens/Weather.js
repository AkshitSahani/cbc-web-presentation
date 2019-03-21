import React, {Component} from 'react';

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
};

class Weather extends Component {

  state = {
    data: null,
  }

  componentDidMount(){
    this.getCurrentLocation();
    // this.fetchData();
  }

  getCurrentLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationFailure, options)
    }
    else{
      console.log('gelocation is not supported by this browser!!');
    }
  }

  locationSuccess = (position) => {
    console.log('in success function', position);
    const {latitude, longitude} = position.coords;
    console.log('lat', latitude, 'lng', longitude);
    this.fetchData(latitude, longitude);
  }

  locationFailure = (error) => {
    console.log('in failure function', error);
  }

  processResponse = async(response) => {
    const textResp = await response.text();
    console.log('textResp!!!!!', textResp);
    const xml = await (new DOMParser()).parseFromString(textResp, 'application/xml');
    // console.log('processed Response', xml);
    return xml;
  }

  xmlToJson = (json) => {

  }

  fetchData = async(lat, lon) => {
    console.log('in fetch data func', lat, lon);
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&mode=xml&APPID=ea4d580ff1e59a02c1837843ebdeccdc`;
      const response = await fetch(url);
      // console.log('resp from fetch Data', response.text());
      const xmlResp = await this.processResponse(response);
      console.log('xmlResp', xmlResp);

      // return fetch(url)
      //   .then(response => response.text())
      //   .then(str => (new DOMParser()).parseFromString(str, "application/xml"))
      //   .then(data => console.log(data))
      //   .catch(e=>console.log('error', e))
    }
    catch(e){
      console.log('error in fetching data', e);
      console.log('full error', e.response);
    }
  }


  render(){
    return (
      <div>
        <h1>
          Weather page!!!
        </h1>
      </div>
    )
  }
}

export default Weather;
