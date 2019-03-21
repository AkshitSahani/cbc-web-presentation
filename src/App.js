import React, { Component } from 'react';
import './App.css';
import Weather from './Screens/Weather';
import store from './store';
import {Provider} from 'react-redux';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Weather />
        </div>
      </Provider>
    );
  }
}

export default App;
