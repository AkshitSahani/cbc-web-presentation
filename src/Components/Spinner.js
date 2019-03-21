import React from 'react';
import { FadeLoader } from 'react-spinners';

const Spinner = (props) => {
  return (
    <div className="spinner">
      <FadeLoader
        sizeUnit={"px"}
        size={50}
        color={'red'}
        loading={props.loading}
        // style={{...props.style}}
      />
    </div>
  )
};

export default Spinner;
