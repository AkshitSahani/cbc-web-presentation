import React from 'react';
import Element from './Element';
import {connect} from 'react-redux';

const Elements = (props) => {
  return(
    <div className='elements-container'>
      {console.log('in elements body', props.load)}
      {props.load && renderElements(props.elements)}
    </div>
  )
}

const mapStateToProps = (state) => {
  const {elements} = state.weather;
  return {
    elements,
  }
}

export default connect(mapStateToProps)(Elements);

const capitalize = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const localTime = (date) => (new Date(`${date}.000Z`)).toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12: true });
  // const date = new Date(`${date}.000Z`);
  // const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  // const date = (new Date(`${date}.000Z`)).toString()).split('GMT-0400').join(' ');
// }

const renderElements = (elements) => {
  // console.log('in renderElements func', elements);
  const result = [];
  let details;
  for(var key in elements){
    if(key === 'sunrise' || key === 'sunset'){
      details = localTime(elements[key]);
    }
    else if(key === 'wind'){
      details = `${elements[key].direction.code} ${elements[key].speed.value * 3.6} km/h`
    }
    else{
      let {unit, value} = elements[key];
      if(key === 'pressure'){
        value = (value/10).toFixed(1);
        unit = 'kPa';
      }
      details = unit ? `${value} ${unit}` : `${(value/1000).toFixed(1)} km`;
    }
    // console.log('keyname', key, 'details', details);
    result.push(
      <Element
        key={key}
        title={capitalize(key)}
        details={details}
      />
    )
  }
  // console.log('result', result);
  return result;
}
