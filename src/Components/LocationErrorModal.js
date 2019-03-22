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
    >
      <div>
        hello world!!!
      </div>
    </ReactModal>
  )
}

export default LocationErrorModal;
