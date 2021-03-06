import React from 'react';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

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
          alt="cancel img"
        />
      </div>

      <div>
        {props.error ? renderError(props.error) : null}
      </div>
    </ReactModal>
  )
}

export default LocationErrorModal;

const renderLink = (link, text) => (
  <a target="_blank" rel="noopener noreferrer" href={link}>
    {text}
  </a>
);

const renderError = (error) => {
  // console.log('in error func');
  let response;
  if(error === 1){
    // console.log('in error check');
    response = (
      <p style={{fontFamily: 'Arial'}}>
        It seems like access to your location has been denied. We simply use it to provide
        weather forecasts based on your live location. You can provide access via your browser
        settings and reload the page. Here are some links to help you:
        <br/><br/>

        {renderLink("https://www.wikihow.com/Enable-Location-Services-on-Google-Chrome", 'Chrome')}<br/><br/>

        {renderLink('https://support.apple.com/en-ca/HT204690', 'Safari')}<br/><br/>

        {renderLink('https://support.mozilla.org/en-US/kb/permissions-manager-give-ability-store-passwords-set-cookies-more?redirectlocale=en-US&redirectslug=how-do-i-manage-website-permissions', 'Firefox')}<br/><br/>

        {/* Alternatively, you can also close this modal, and enter your location manually to get weather forecasts. */}
      </p>
    )
  }
  else {
    response = (
      <p>
        Oops! Something went wrong while trying to access your location. Please reload the page. <br/><br/>
        It is also possible that the location services on your device are disabled.
        Here are some links to help you enable location services on your device: <br/><br/>

        {renderLink('https://support.apple.com/en-ca/HT204690', 'Mac')}<br/><br/>

        {renderLink('https://support.microsoft.com/en-us/help/4468240/windows-10-location-service-and-privacy-microsoft-privacy', 'Windows')}<br/><br/>

        {renderLink('https://help.ubuntu.com/stable/ubuntu-help/privacy-location.html.en', 'Linux')}<br/><br/>

        {/* Alternatively, you can also close this modal, and enter your location manually to get weather forecasts. */}
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
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  }
};
