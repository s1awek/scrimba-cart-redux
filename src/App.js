/** @format */

import React from 'react';
// components
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
// redux stuff
import { createStore } from 'redux';
import { reducer } from './reducer';
import { Provider } from 'react-redux';

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() - is for redux chrome extension
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer />
    </Provider>
  );
}

export default App;
