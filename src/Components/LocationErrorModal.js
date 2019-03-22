import React from 'react';
import ReactModal from 'react-modal';


const LocationErrorModal = (props) => {
  return (
    <ReactModal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      style={styles}
    >
      <div className="cancel">
        <img
          src={require('../assets/cancel.png')} height={20} width={20}
          onClick={props.closeModal}
        />
      </div>

      <div>
        {props.error ? renderError(props.error) : null}
      </div>
    </ReactModal>
  )
}

export default LocationErrorModal;

const renderError = (error) => {
  // console.log('in error func');
  let response;
  if(error === 1){
    // console.log('in error check');
    response = (
      <p>
        It seems like access to your location has been denied. We simply use it to provide
        weather forecasts based on your live location. You can provide access via your browser
        settings and reload the page. Here are some links to help you:
        <br/><br/>

        <a target="_blank" href="https://www.wikihow.com/Enable-Location-Services-on-Google-Chrome">Chrome</a>

        <br/><br/>

        <a target="_blank" href="https://support.apple.com/en-ca/HT204690">Safari</a>

        <br/><br/>

        <a target="_blank" href="https://support.mozilla.org/en-US/kb/permissions-manager-give-ability-store-passwords-set-cookies-more?redirectlocale=en-US&redirectslug=how-do-i-manage-website-permissions">Firefox</a>

        <br/><br/>

        Alternatively, you can also close this modal, and enter your location manually to get weather forecasts.
      </p>
    )
  }
  else {
    response = (
      <p>
        Oops! Something went wrong while trying to access your location. Please reload the page. <br/><br/>
        It is also possible that the location services on your device are disabled.
        Here are some links to help you enable location services on your device: <br/><br/>

        <a target="_blank" href="https://support.apple.com/en-ca/HT204690">Mac</a><br/><br/>

        <a target="_blank" href="https://support.microsoft.com/en-us/help/4468240/windows-10-location-service-and-privacy-microsoft-privacy">Windows</a><br/><br/>

        <a target="_blank" href="https://help.ubuntu.com/stable/ubuntu-help/privacy-location.html.en">Linux</a><br/><br/>

        Alternatively, you can also close this modal, and enter your location manually to get weather forecasts.
      </p>
    )
  }
  return response;
}

const styles = {
  content : {
    top: '25%',
    left: '25%',
    right: '25%',
    bottom: '25%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  }
};
