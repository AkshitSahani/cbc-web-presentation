import React, {Component} from 'react';
import * as WeatherActions from '../Actions/WeatherActions';
import {connect} from 'react-redux';
// var convert = require('xml-js');
// var parseString = require('xml2js').parseString;
import Spinner from '../Components/Spinner';

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
};

class Weather extends Component {

  state = {
    data: null,
    loading: true,
  }

  componentDidMount(){
    this.getCurrentLocation();
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

  xmlToJson = (xml) => {
    // Create the return object
  	var obj = {};

  	if (xml.nodeType === 1) { // element
  		// do attributes
  		if (xml.attributes.length > 0) {
  		// obj["@attributes"] = {};
  			for (var j = 0; j < xml.attributes.length; j++) {
  				var attribute = xml.attributes.item(j);
          obj[attribute.nodeName] = attribute.nodeValue;
  				// obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
  			}
  		}
  	} else if (xml.nodeType === 3) { // text
  		obj = xml.nodeValue;
  	}

  	// do children
  	if (xml.hasChildNodes()) {
  		for(var i = 0; i < xml.childNodes.length; i++) {
  			var item = xml.childNodes.item(i);
  			var nodeName = item.nodeName;
  			if (typeof(obj[nodeName]) == "undefined") {
  				obj[nodeName] = this.xmlToJson(item);
  			} else {
  				if (typeof(obj[nodeName].push) == "undefined") {
  					var old = obj[nodeName];
  					obj[nodeName] = [];
  					obj[nodeName].push(old);
  				}
  				obj[nodeName].push(this.xmlToJson(item));
  			}
  		}
  	}
  	return obj;
  }

  fetchData = async() => {
  // fetchData = async(lat, lon) => {
    // console.log('in fetch data func', lat, lon);
    if(!this.state.loading){
      this.setState({loading: true});
    }

    const {latitude, longitude} = this.state;
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&mode=xml&APPID=ea4d580ff1e59a02c1837843ebdeccdc`;
      // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&mode=xml&APPID=ea4d580ff1e59a02c1837843ebdeccdc`;
      const response = await fetch(url);
      // console.log('resp from fetch Data', response.json());
      const xmlResp = await this.processResponse(response);
      console.log('xmlResp', xmlResp);
      // var xmlText = new XMLSerializer().serializeToString(xmlResp);
      // console.log('xmlText', xmlText);
      const jsonResp = this.xmlToJson(xmlResp);
      // var result1 = convert.xml2json(xmlText, {compact: true, spaces: 4});
      // console.log('result!!!!!!!', result1);
      // parseString(xmlText, (err, res) => {
      //   console.log('resp from parse string', res);
      //   console.log('finalllll', JSON.stringify(res))
      // });
      this.props.setWeatherData(jsonResp);
      this.setState({loading: false});
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
          Weather page!!!
        </h1>

        <button onClick={this.fetchData}>
          REFRESH
        </button>

        <Spinner
          loading={this.state.loading}
          // style={{alignSelf: 'center'}}
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
