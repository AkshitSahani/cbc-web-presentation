import React from 'react';
import ReactModal from 'react-modal';


const LocationErrorModal = (props) => {
  return (
    <ReactModal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      // style={{ overlay: {}, content: {} }}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      data={{background: "red"}}
      style={customStyles}
    >
      {/* <div> */}
        {props.locationError}
        Hello
      {/* </div> */}
    </ReactModal>
  )
}

export default LocationErrorModal;

const customStyles = {
  content : {
    top                   : '25%',
    left                  : '25%',
    right                 : '25%',
    bottom                : '25%',
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    // opacity: 0.5
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // opacity: 0.6
  }
};
