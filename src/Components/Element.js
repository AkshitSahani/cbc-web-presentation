import React from 'react';

const Element = (props) => {
  return (
    <span className="element">
      <span className="element-heading">
        {props.title}:
      </span>
      <span className="element-details">
        {props.details}
      </span>
    </span>
  )
}

export default Element;
