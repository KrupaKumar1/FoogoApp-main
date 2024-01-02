// App.js
import React from 'react';
import Navigation from './src/navigator/Navigation';
import store from './src/services/store/Store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
